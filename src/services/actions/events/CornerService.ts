import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { ActionResult } from 'src/interface/ActionResult';
import { MatchFieldFactory } from 'app/test/mocks/MatchFieldFactory';
import { CrossingService } from '../crossing/CrossingService';
import { MatchPlayer } from 'src/interface/MatchField';

export class CornerService extends AbstractActionService {
  protected crossingService: CrossingService;

  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
    this.crossingService = new CrossingService(matchFieldService);
  }

  execute(teamCorner: string): ActionResult {
    const cornerPlayer = MatchFieldFactory.buildCrossPlayer();
    const cornerFactor = this.getCornerSpecialSkill(cornerPlayer);
    this.matchFieldService.logStep(
      `Cobrando escanteio fator '${cornerFactor}'...`
    );
    return this.crossingService.execute(cornerPlayer, cornerFactor);
  }

  private getCornerSpecialSkill(cornerPlayer: MatchPlayer): number {
    switch (cornerPlayer.specialSkills.corner) {
      case 1:
        return 1.1;
      case 2:
        return 1.2;
      case 3:
        return 1.3;
      default:
        return 1;
    }
  }
}
