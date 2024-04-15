import { ActionZoneEnum } from 'src/enums/ActionDecisionEnum';

export enum TeamSide {
  HOME = 'home',
  OUT = 'out',
}

export const FieldZones = {
  [ActionZoneEnum.SMALL_AREA]: {
    [TeamSide.HOME]: [
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [TeamSide.OUT]: [
      [1, 4],
      [2, 4],
      [3, 4],
    ],
  },
  [ActionZoneEnum.BIG_AREA]: {
    [TeamSide.HOME]: [
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [TeamSide.OUT]: [
      [1, 3],
      [2, 3],
      [3, 3],
    ],
  },
  [ActionZoneEnum.LATERAL_AREA]: {
    [TeamSide.HOME]: [
      [0, 0],
      [0, 1],
      [4, 0],
      [4, 1],
    ],
    [TeamSide.OUT]: [
      [0, 3],
      [0, 4],
      [4, 3],
      [4, 4],
    ],
  },
  [ActionZoneEnum.PRE_AREA]: {
    [TeamSide.HOME]: [
      [1, 2],
      [2, 2],
      [3, 2],
    ],
    [TeamSide.OUT]: [
      [1, 2],
      [2, 2],
      [3, 2],
    ],
  },
  [ActionZoneEnum.LATERAL_MID_FIELD]: {
    [TeamSide.HOME]: [
      [0, 2],
      [4, 2],
    ],
    [TeamSide.OUT]: [
      [0, 2],
      [4, 2],
    ],
  },
  [ActionZoneEnum.MID_FIELD_CENTER]: {
    [TeamSide.HOME]: [
      [1, 3],
      [2, 3],
      [3, 3],
    ],
    [TeamSide.OUT]: [
      [1, 1],
      [2, 1],
      [3, 1],
    ],
  },
};
