import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { MatchPlayer } from 'src/interface/MatchField';
import { ActionResult } from 'src/interface/ActionResult';
import { ChooseCrossingDestinationService } from './ChooseCrossingDestinationService';
import { AerialInterceptationService } from './AerialInterceptationService';
import { CrossingDestination } from 'src/interface/action/crossing/CrossingDestination';
import { SituationEnum } from 'src/enums/ActionDecisionEnum';
import { TeamSide } from 'src/constants/FieldZones';
import { NumberHelper } from 'src/helper/types/NumberHelper';
import { Position } from 'src/interface/Position';

export class CrossingService extends AbstractActionService {
  protected chooseCrossingDestService: ChooseCrossingDestinationService;
  protected aerialInterceptationService: AerialInterceptationService;

  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
    this.chooseCrossingDestService = new ChooseCrossingDestinationService(
      matchFieldService
    );
    this.aerialInterceptationService = new AerialInterceptationService(
      matchFieldService
    );
  }

  execute(crossPlayer: MatchPlayer, crossingFactor = 1): ActionResult {
    const destination =
      this.chooseCrossingDestService.chooseCrossingDestination(crossPlayer);

    const crossingValue =
      this.calculateOscilationResult(crossPlayer.skills.crossing) *
      crossingFactor;

    this.matchFieldService.logStep(
      `Cruzamento '${crossingValue}' para '${JSON.stringify(destination)}'...`
    );

    const interception =
      this.aerialInterceptationService.tryAerialInterceptation(
        crossPlayer,
        crossingValue,
        destination
      );

    if (interception.success) {
      if (
        interception.situation &&
        interception.situation.type === SituationEnum.CORNER
      )
        this.matchFieldService.logStep('Bola para escanteio.');

      return {
        ...interception,
        success: false,
      };
    }

    return this.endCrossing(crossPlayer, crossingValue, destination);
  }

  private endCrossing(
    crossPlayer: MatchPlayer,
    crossingValue: number,
    endPosition: CrossingDestination
  ): ActionResult {
    const targetCrossing = this.calculateSucessProb(crossingValue);

    if (!targetCrossing || !endPosition.destinationPlayer) {
      this.matchFieldService.logStep('Cruzamento não chegou no jogador');
      return {
        success: false,
        ballPosition: this.getWrongCrossingPosition(crossPlayer),
      };
    }

    const reachFactor =
      endPosition.destinationPlayer.skills.jumping *
      (endPosition.destinationPlayer.physical.height / 2);

    const reachCrossing = this.calculateSucessProb(reachFactor * 1.25);

    if (!reachCrossing) {
      this.matchFieldService.logStep('Jogador não alcançou a bola.');
      return {
        success: false,
        ballPosition: this.getWrongCrossingPosition(crossPlayer),
      };
    }

    this.matchFieldService.logStep('Cruzamento chegou ao destino');
    return {
      success: true,
      ballPosition: endPosition.destinationPosition,
      situation: {
        team: crossPlayer.team,
        type: SituationEnum.AERIAL_OFFENSIVE_ATTACK,
      },
    };
  }

  private getWrongCrossingPosition(crossPlayer: MatchPlayer): Position {
    const positionY = crossPlayer.position.y == 0 ? 4 : 0;
    const teamSide = this.matchFieldService.getTeamSideOpposite(
      crossPlayer.team
    );
    const positionX =
      teamSide === TeamSide.HOME
        ? NumberHelper.random(1)
        : NumberHelper.random(8, 9);
    return { y: positionY, x: Math.round(positionX) };
  }
}
