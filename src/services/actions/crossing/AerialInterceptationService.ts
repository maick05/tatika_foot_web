import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { MatchPlayer } from 'src/interface/MatchField';
import { AeriaInterceptationResult } from 'src/interface/action/crossing/AeriaInterceptationResult';
import { CrossingDestination } from 'src/interface/action/crossing/CrossingDestination';
import { PlayerPositionService } from '../playerPosition/PlayerPositionService';
import { SituationEnum } from 'src/enums/ActionDecisionEnum';
import { PenaltyProbs } from 'src/constants/EventConstants';
import { InfractionService } from './InfractionService';
import { Position } from 'src/interface/Position';

export class AerialInterceptationService extends AbstractActionService {
  protected playerPositionService: PlayerPositionService;
  protected infractionService: InfractionService;

  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
    this.playerPositionService = new PlayerPositionService(matchFieldService);
    this.infractionService = new InfractionService(matchFieldService);
  }

  tryAerialInterceptation(
    crossPlayer: MatchPlayer,
    crossingValue: number,
    endPosition: CrossingDestination
  ): AeriaInterceptationResult {
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

    this.matchFieldService.logStep('Bola passou para disputa aérea');

    const gkIntercept = this.aerialGKInterception(
      crossPlayer,
      endPosition.destinationPosition
    );
    if (gkIntercept.success) return gkIntercept;

    const closeInterceptation = this.checkAerialCloseInterception(
      crossPlayer,
      crossingValue,
      endPosition,
      deffensePlayers
    );
    if (closeInterceptation.success) return closeInterceptation;

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
        crossPlayer,
        crossingValue,
        def,
        endPosition,
        PenaltyProbs.AERIAL_LINE_INTERCEPTATION
      );
      if (result.success) {
        this.matchFieldService.logStep('Cruzamento interceptado na trajetória');
        lineIinterceptation = result;
        break;
      }
    }
    return lineIinterceptation;
  }

  private checkAerialCloseInterception(
    crossPlayer: MatchPlayer,
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
        crossPlayer,
        crossingValue,
        player,
        endPosition,
        PenaltyProbs.AERIAL_DISPUTE
      );
      if (result.success) {
        this.matchFieldService.logStep(
          'Interceptado por adversário próximo no cruzamento'
        );
        interceptationByCloseOp = result;
        break;
      }
    }

    if (
      endPosition.destinationPlayer &&
      !interceptationByCloseOp.success &&
      areaPlayers.length
    ) {
      const attackFoul = this.infractionService.checkAttackInfraction(
        endPosition.destinationPlayer.skills.aggressivity
      );
      if (attackFoul.infraction) {
        this.matchFieldService.logStep('Falta de ataque.');
        return {
          success: true,
          ballPosition: endPosition.destinationPosition,
          interceptationPlayer: null,
          situation: {
            team: areaPlayers[0].team,
            type: SituationEnum.FREE_KICK,
          },
        };
      }
    }

    return interceptationByCloseOp;
  }

  private tryInterceptation(
    crossPlayer: MatchPlayer,
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

    const penalty = this.infractionService.calculatePenalty(
      interceptationPlayer.team,
      penaltyProb
    );
    if (penalty.penalty) {
      this.matchFieldService.logStep('PENALTY!!');
      return {
        success: true,
        ballPosition: penalty.position,
        interceptationPlayer,
        situation: {
          team: crossPlayer.team,
          type: SituationEnum.PENALTY,
        },
      };
    }

    const cornerAvoided = this.calculateSucessProb(interceptationValue, 0.9);

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
      situation: !cornerAvoided
        ? {
            team: crossPlayer.team,
            type: SituationEnum.CORNER,
          }
        : undefined,
    };
  }

  private aerialGKInterception(
    crossPlayer: MatchPlayer,
    destinationPosition: Position
  ): AeriaInterceptationResult {
    const continueCrossing = {
      success: false,
      ballPosition: destinationPosition,
      interceptationPlayer: null,
      situation: {
        type: SituationEnum.AERIAL_OFFENSIVE_ATTACK,
        team: crossPlayer.team,
      },
    };

    if (destinationPosition.y > 0 && destinationPosition.y < 9)
      return continueCrossing;

    const offLineGK = this.calculateSucessProb(30);
    if (!offLineGK) return continueCrossing;

    this.matchFieldService.logStep('Goleiro sai para interceptar.');

    const goalKeeper = this.matchFieldService.getGoalkeeper(crossPlayer.team);

    const command = this.calculateOscilationResult(
      goalKeeper.skills.goalkeeperAerealCommand
    );
    const jumping = this.calculateOscilationResult(
      goalKeeper.skills.goalkeeperJumping
    );
    const pos = this.calculateOscilationResult(
      goalKeeper.skills.goalkeeperPositioning
    );
    const gkCommandValue = (command * 7 + jumping * 2 + pos) / 10;

    const gkSuccess = this.calculateSucessProb(gkCommandValue * 1.5);
    if (!gkSuccess) {
      this.matchFieldService.logStep('Goleira erra interceptação');
      return {
        ...continueCrossing,
        situation: {
          ...continueCrossing.situation,
          gkOut: true,
        },
      };
    }

    this.matchFieldService.logStep('Goleiro intercepta.');

    const gkPossession = this.calculateSucessProb(gkCommandValue);
    if (!gkPossession)
      return {
        success: true,
        ballPosition: this.calculateDetour(
          crossPlayer.position,
          destinationPosition,
          4
        ),
        interceptationPlayer: goalKeeper,
      };

    this.matchFieldService.logStep('Posse de bola com o goleiro.');

    return {
      success: true,
      ballPosition: goalKeeper.position,
      interceptationPlayer: goalKeeper,
      situation: {
        team: goalKeeper.team,
        type: SituationEnum.GOALKEEPER_POSSESSION,
      },
    };
  }
}
