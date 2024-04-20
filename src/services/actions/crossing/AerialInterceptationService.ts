import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { MatchPlayer } from 'src/interface/MatchField';
import { AeriaInterceptationResult } from 'src/interface/action/crossing/AeriaInterceptationResult';
import { CrossingDestination } from 'src/interface/action/crossing/CrossingDestination';
import { MatchEventEnum } from 'src/enums/MatchEventEnum';
import { PlayerPositionService } from '../playerPosition/PlayerPositionService';
import { EventZoneEnum } from 'src/enums/ActionDecisionEnum';
import { PenaltyProbs } from 'src/constants/EventConstants';

export class AerialInterceptationService extends AbstractActionService {
  protected playerPositionService: PlayerPositionService;

  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
    this.playerPositionService = new PlayerPositionService(matchFieldService);
  }

  tryAerialInterceptation(
    crossPlayer: MatchPlayer,
    crossingValue: number,
    endPosition: CrossingDestination
  ): AeriaInterceptationResult {
    console.log('Cruzando para...');
    console.log(endPosition.destinationPosition);
    console.log(crossPlayer);

    const deffensePlayers = this.matchFieldService.getOpponentPlayers(
      crossPlayer.team
    );

    const lineInterceptation = this.checkCrossingLineDeffense(
      crossPlayer,
      crossingValue,
      endPosition,
      deffensePlayers
    );
    if (lineInterceptation.success) return lineInterceptation;

    console.log('Bola passou para disputa aérea');

    const closeInterceptation = this.checkAerialCloseInterception(
      crossingValue,
      endPosition,
      deffensePlayers
    );
    if (closeInterceptation.success) return closeInterceptation;

    console.log('Cruzamento chegou ao destino');

    return {
      success: false,
      ballPosition: endPosition.destinationPosition,
      interceptationPlayer: null,
    };
  }

  private checkCrossingLineDeffense(
    crossPlayer: MatchPlayer,
    crossingValue: number,
    endPosition: CrossingDestination,
    deffensePlayers: MatchPlayer[]
  ): AeriaInterceptationResult {
    let lineIinterceptation: AeriaInterceptationResult = {
      success: false,
      ballPosition: endPosition.destinationPosition,
      interceptationPlayer: null,
    };
    const deffenseLinePlayers = deffensePlayers.filter((player) => {
      return (
        player.position.y > 0 &&
        player.position.y < 4 &&
        ((crossPlayer.position.y == 0 &&
          player.position.y <= endPosition.destinationPosition.y) ||
          (crossPlayer.position.y == 4 &&
            player.position.y >= endPosition.destinationPosition.y)) &&
        player.position.x === endPosition.destinationPosition.x
      );
    });

    for (const def of deffenseLinePlayers) {
      const result = this.tryInterceptation(
        crossingValue,
        def,
        endPosition,
        PenaltyProbs.AERIAL_LINE_INTERCEPTATION
      );
      if (result.success) {
        console.log('Cruzamento interceptado na trajetória');
        console.log(result);
        lineIinterceptation = result;
        break;
      }
    }
    return lineIinterceptation;
  }

  private checkAerialCloseInterception(
    crossingValue: number,
    endPosition: CrossingDestination,
    deffensePlayers: MatchPlayer[]
  ): AeriaInterceptationResult {
    let interceptationByCloseOp: AeriaInterceptationResult = {
      success: false,
      ballPosition: endPosition.destinationPosition,
      interceptationPlayer: null,
    };
    const areaPlayers = deffensePlayers.filter((player) =>
      this.playerPositionService.checkIfOpponentIsClose(
        endPosition.destinationPosition,
        player.position,
        1
      )
    );

    for (const player of areaPlayers) {
      const result = this.tryInterceptation(
        crossingValue,
        player,
        endPosition,
        PenaltyProbs.AERIAL_DISPUTE
      );
      if (result.success) {
        console.log('Interceptado por adversário próximo no cruzamento');
        interceptationByCloseOp = result;
        break;
      }
    }
    return interceptationByCloseOp;
  }

  private tryInterceptation(
    crossingValue: number,
    interceptationPlayer: MatchPlayer,
    endPosition: CrossingDestination,
    penaltyProb = PenaltyProbs.DEFAULT_PROB
  ): AeriaInterceptationResult {
    const defHeadingValue = this.calculateOscilationResult(
      interceptationPlayer.skills.defensiveHeading
    );
    const jumpingValue = this.calculateOscilationResult(
      interceptationPlayer.skills.jumping *
        (interceptationPlayer.physical.height / 1.9)
    );
    const interceptationFactor = (defHeadingValue + jumpingValue) / 1.6;
    const interceptationValue =
      this.calculateOscilationResult(interceptationFactor);
    const intercepted = interceptationValue > crossingValue;

    if (!intercepted)
      return {
        success: false,
        ballPosition: endPosition.destinationPosition,
        interceptationPlayer: null,
      };

    const penalty = this.calculatePenalty(
      interceptationPlayer.team,
      penaltyProb
    );
    if (penalty.penalty)
      return {
        success: true,
        ballPosition: penalty.position,
        interceptationPlayer,
        eventResulted: EventZoneEnum.PENALTY,
      };

    const cornerAvoided = this.calculateSucessProb(interceptationValue, 0.7);

    if (!cornerAvoided) console.log('Bola para escanteio.');

    return {
      success: true,
      ballPosition: !cornerAvoided
        ? this.getCornerPosition(
            interceptationPlayer.team,
            interceptationPlayer.position
          )
        : this.calculateDetour(
            interceptationPlayer.position,
            endPosition.destinationPosition,
            3
          ),
      interceptationPlayer,
      eventResulted: !cornerAvoided ? MatchEventEnum.CORNER : undefined,
    };
  }
}
