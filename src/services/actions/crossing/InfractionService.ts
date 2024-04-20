import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { AbstractEventZones } from 'src/constants/FieldZones';
import { EventZoneEnum } from 'src/enums/ActionDecisionEnum';
import { Position } from 'src/interface/Position';
import { PenaltyProbs } from 'src/constants/EventConstants';

export class InfractionService extends AbstractActionService {
  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
  }

  calculatePenalty(
    penaltyTeam,
    chance = PenaltyProbs.DEFAULT_PROB,
    agressivityFactor = 0
  ): {
    penalty: boolean;
    position?: Position;
    type?: string;
  } {
    const factor = chance * (1 + agressivityFactor);
    const penalty = this.calculateSucessProb(factor);
    return { penalty, position: this.getPenaltyPosition(penaltyTeam) };
  }

  getPenaltyPosition(penaltyTeam): Position {
    const teamSide = this.matchFieldService.getTeamSide(penaltyTeam);
    return AbstractEventZones[EventZoneEnum.PENALTY][teamSide];
  }

  checkAttackInfraction(agressivityFactor: number): {
    infraction: boolean;
    card: number;
  } {
    const infraction = this.calculateSucessProb(agressivityFactor * 0.2);
    return {
      infraction,
      card: 0,
    };
  }
}
