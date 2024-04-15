import {
  ActionDecisionEnum,
  ActionSide,
  ActionZoneEnum,
} from 'src/enums/ActionDecisionEnum';
import { ActionWeight } from 'src/interface/ActionDecision';

export const ActionWeights: ActionWeight = {
  [ActionZoneEnum.SMALL_AREA]: {
    [ActionSide.DEFENSE]: {
      [ActionDecisionEnum.OUT_AWAY]: 50,
      [ActionDecisionEnum.SHORT_PASS]: 30,
      [ActionDecisionEnum.LONG_PASS]: 14,
      [ActionDecisionEnum.HOLD]: 1,
      [ActionDecisionEnum.DRIBBLING]: 5,
    },
    [ActionSide.ATTACK]: {
      [ActionDecisionEnum.CLOSE_BLANK_SHOT]: 70,
      [ActionDecisionEnum.SHORT_PASS]: 20,
      [ActionDecisionEnum.DRIBBLING_GOALKEEPER]: 8,
      [ActionDecisionEnum.HOLD]: 2,
    },
  },
  [ActionZoneEnum.BIG_AREA]: {
    [ActionSide.DEFENSE]: {
      [ActionDecisionEnum.OUT_AWAY]: 35,
      [ActionDecisionEnum.SHORT_PASS]: 55,
      [ActionDecisionEnum.DRIBBLING]: 7,
      [ActionDecisionEnum.HOLD]: 3,
    },
    [ActionSide.ATTACK]: {
      [ActionDecisionEnum.MIDDLE_SHOT]: 35,
      [ActionDecisionEnum.SHORT_PASS]: 35,
      [ActionDecisionEnum.DRIBBLING]: 25,
      [ActionDecisionEnum.HOLD]: 5,
    },
  },
  [ActionZoneEnum.LATERAL_AREA]: {
    [ActionSide.DEFENSE]: {
      [ActionDecisionEnum.OUT_AWAY]: 30,
      [ActionDecisionEnum.LONG_PASS]: 15,
      [ActionDecisionEnum.SHORT_PASS]: 50,
      [ActionDecisionEnum.HOLD]: 5,
    },
    [ActionSide.ATTACK]: {
      [ActionDecisionEnum.CROSSING]: 65,
      [ActionDecisionEnum.SHORT_PASS]: 10,
      [ActionDecisionEnum.DRIBBLING]: 15,
      [ActionDecisionEnum.HOLD]: 10,
    },
  },
  [ActionZoneEnum.PRE_AREA]: {
    [ActionSide.DEFENSE]: {
      [ActionDecisionEnum.SHORT_PASS]: 60,
      [ActionDecisionEnum.LONG_PASS]: 20,
      [ActionDecisionEnum.DRIBBLING]: 10,
      [ActionDecisionEnum.HOLD]: 10,
    },
    [ActionSide.ATTACK]: {
      [ActionDecisionEnum.LONG_SHOT]: 30,
      [ActionDecisionEnum.SHORT_PASS]: 40,
      [ActionDecisionEnum.DRIBBLING]: 20,
      [ActionDecisionEnum.HOLD]: 10,
    },
  },
  [ActionZoneEnum.LATERAL_MID_FIELD]: {
    [ActionSide.DEFENSE]: {
      [ActionDecisionEnum.LONG_PASS]: 30,
      [ActionDecisionEnum.SHORT_PASS]: 60,
      [ActionDecisionEnum.HOLD]: 10,
    },
    [ActionSide.ATTACK]: {
      [ActionDecisionEnum.CROSSING]: 10,
      [ActionDecisionEnum.LONG_PASS]: 20,
      [ActionDecisionEnum.SHORT_PASS]: 60,
      [ActionDecisionEnum.HOLD]: 10,
    },
  },
  [ActionZoneEnum.MID_FIELD_CENTER]: {
    [ActionSide.DEFENSE]: {
      [ActionDecisionEnum.SHORT_PASS]: 40,
      [ActionDecisionEnum.LONG_PASS]: 30,
      [ActionDecisionEnum.DRIBBLING]: 20,
      [ActionDecisionEnum.HOLD]: 10,
    },
    [ActionSide.ATTACK]: {
      [ActionDecisionEnum.SHORT_PASS]: 40,
      [ActionDecisionEnum.LONG_PASS]: 30,
      [ActionDecisionEnum.DRIBBLING]: 20,
      [ActionDecisionEnum.HOLD]: 10,
    },
  },
};
