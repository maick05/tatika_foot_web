import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { MatchPlayer } from 'src/interface/MatchField';
import { ActionResult } from 'src/interface/ActionResult';
import { ChooseCrossingDestinationService } from './ChooseCrossingDestinationService';
import { AerialInterceptationService } from './AerialInterceptationService';

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

  execute(crossPlayer: MatchPlayer): ActionResult {
    const destination =
      this.chooseCrossingDestService.chooseCrossingDestination(crossPlayer);

    const crossingValue = this.calculateOscilationResult(
      crossPlayer.skills.crossing
    );

    const interception =
      this.aerialInterceptationService.tryAerialInterceptation(
        crossPlayer,
        crossingValue,
        destination
      );

    if (interception.success) return interception;

    return {
      success: true,
      ballPosition: destination.destinationPosition,
    };
  }
}
