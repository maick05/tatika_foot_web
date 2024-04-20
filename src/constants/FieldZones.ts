import {
  AbstractFieldZoneEnum,
  ActionZoneEnum,
  EventZoneEnum,
} from 'src/enums/ActionDecisionEnum';

export enum TeamSide {
  HOME = 'home',
  OUT = 'out',
}

export const FieldZones = {
  [ActionZoneEnum.SMALL_AREA]: {
    [TeamSide.HOME]: [
      { y: 1, x: 0 },
      { y: 2, x: 0 },
      { y: 3, x: 0 },
    ],
    [TeamSide.OUT]: [
      { y: 1, x: 9 },
      { y: 2, x: 9 },
      { y: 3, x: 9 },
    ],
  },
  [ActionZoneEnum.BIG_AREA]: {
    [TeamSide.HOME]: [
      { y: 1, x: 1 },
      { y: 2, x: 1 },
      { y: 3, x: 1 },
    ],
    [TeamSide.OUT]: [
      { y: 1, x: 8 },
      { y: 2, x: 8 },
      { y: 3, x: 8 },
    ],
  },
  [ActionZoneEnum.LATERAL_AREA]: {
    [TeamSide.HOME]: [
      { y: 0, x: 0 },
      { y: 0, x: 1 },
      { y: 4, x: 0 },
      { y: 4, x: 1 },
    ],
    [TeamSide.OUT]: [
      { y: 0, x: 8 },
      { y: 0, x: 9 },
      { y: 4, x: 8 },
      { y: 4, x: 9 },
    ],
  },
  [ActionZoneEnum.PRE_AREA]: {
    [TeamSide.HOME]: [
      { y: 1, x: 2 },
      { y: 2, x: 2 },
      { y: 3, x: 2 },
    ],
    [TeamSide.OUT]: [
      { y: 1, x: 7 },
      { y: 2, x: 7 },
      { y: 3, x: 7 },
    ],
  },
  [ActionZoneEnum.LATERAL_MID_FIELD]: {
    [TeamSide.HOME]: [
      { y: 0, x: 2 },
      { y: 4, x: 2 },
      { y: 0, x: 3 },
      { y: 4, x: 3 },
      { y: 0, x: 4 },
      { y: 4, x: 4 },
    ],
    [TeamSide.OUT]: [
      { y: 0, x: 5 },
      { y: 4, x: 5 },
      { y: 0, x: 6 },
      { y: 4, x: 6 },
      { y: 0, x: 7 },
      { y: 4, x: 7 },
    ],
  },
  [ActionZoneEnum.MID_FIELD_CENTER]: {
    [TeamSide.HOME]: [
      { y: 1, x: 3 },
      { y: 2, x: 3 },
      { y: 3, x: 3 },
    ],
    [TeamSide.OUT]: [
      { y: 1, x: 5 },
      { y: 2, x: 5 },
      { y: 3, x: 5 },
    ],
  },
};

export const AbstractEventZones = {
  [AbstractFieldZoneEnum.AREA]: {
    [TeamSide.HOME]: [
      { y: 1, x: 0 },
      { y: 2, x: 0 },
      { y: 3, x: 0 },
      { y: 1, x: 1 },
      { y: 2, x: 1 },
      { y: 3, x: 1 },
    ],
    [TeamSide.OUT]: [
      { y: 1, x: 9 },
      { y: 2, x: 9 },
      { y: 3, x: 9 },
      { y: 1, x: 8 },
      { y: 2, x: 8 },
      { y: 3, x: 8 },
    ],
  },
  [EventZoneEnum.CORNER]: {
    [TeamSide.HOME]: {
      [AbstractFieldZoneEnum.CORNER_UP]: { y: 0, x: 0 },
      [AbstractFieldZoneEnum.CORNER_DOWN]: { y: 4, x: 0 },
    },
    [TeamSide.OUT]: {
      [AbstractFieldZoneEnum.CORNER_UP]: { y: 0, x: 9 },
      [AbstractFieldZoneEnum.CORNER_DOWN]: { y: 4, x: 9 },
    },
  },
  [EventZoneEnum.PENALTY]: {
    [TeamSide.HOME]: { y: 2, x: 8 },
    [TeamSide.OUT]: { y: 2, x: 1 },
  },
};
