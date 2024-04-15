import { ActionWeights } from 'src/constants/ActionWeights';
import {
  ActionDecisionEnum,
  ActionSide,
  ActionZoneEnum,
} from 'src/enums/ActionDecisionEnum';
import { ActionZone } from 'src/interface/ActionDecision';
import { PassService } from './pass/PassService';
import { MatchFieldService } from '../field/MatchFieldService';
import { ActionResult } from 'src/interface/ActionResult';
import { MatchPlayer } from 'src/interface/MatchField';
import { PassRange } from 'src/constants/PassConstants';

export class ActionDecisionService {
  protected passService: PassService;

  constructor(protected matchFieldService: MatchFieldService) {
    this.passService = new PassService(matchFieldService);
  }

  generatePlayerDecision(
    player: MatchPlayer,
    zone: ActionZoneEnum,
    isAttacking: boolean
  ) {
    const context = isAttacking ? ActionSide.ATTACK : ActionSide.DEFENSE;
    const actions = ActionWeights[zone][context];
    const actionResult = this.executeActionZone(
      this.selectWeightedAction(actions),
      player
    );
    this.matchFieldService.setBallPosition(actionResult.ballPosition);
  }

  executeActionZone(
    action: ActionDecisionEnum,
    actionPlayer: MatchPlayer
  ): ActionResult {
    let actionResult;
    switch (action) {
      case ActionDecisionEnum.SHORT_PASS:
      case ActionDecisionEnum.LONG_PASS:
        actionResult = this.passService.execute(
          actionPlayer,
          action == ActionDecisionEnum.SHORT_PASS
            ? PassRange.SHORT_PASS
            : PassRange.LONG_PASS
        );
        break;
      default:
        console.log('ACTION NOT IMPLEMENTED');
        break;
    }

    return {
      action,
      ...actionResult,
    };
  }

  selectWeightedAction(actions: ActionZone): ActionDecisionEnum {
    const totalWeight = Object.values(actions).reduce(
      (sum, weight) => sum + weight,
      0
    );
    let random = Math.random() * totalWeight;
    for (const action in actions) {
      random -= actions[action];
      if (random < 0) {
        return action as ActionDecisionEnum;
      }
    }
  }
}
