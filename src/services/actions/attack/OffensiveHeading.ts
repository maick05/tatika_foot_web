import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { MatchPlayer } from 'src/interface/MatchField';

export class OffensiveHeading extends AbstractActionService {
  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
  }

  execute(attackPlayer: MatchPlayer) {
    // const factor = chance * (1 + agressivityFactor);
    // const penalty = this.calculateSucessProb(factor);
    // return { penalty, position: this.getPenaltyPosition(penaltyTeam) };
  }
}
