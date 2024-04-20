export enum PassRange {
  SHORT_PASS = 2,
  LONG_PASS = 9,
}

export enum MinPassDistance {
  SHORT_PASS = 0,
  LONG_PASS = 3,
}

export enum PassProb {
  SHORT_PASS = 0.85,
  LONG_PASS = 0.65,
  CLOSE_OPPONENT = 0.1,
}

export const PENALTY_BY_DISTANCE_FACTOR = 25;
