import {
  ActionDecisionEnum,
  SituationEnum,
} from 'src/enums/ActionDecisionEnum';
import { Position } from './Position';

export interface ActionResult {
  action?: ActionDecisionEnum;
  success: boolean;
  ballPosition: Position;
  situation?: Situation;
}

export interface Situation {
  team: string;
  type: SituationEnum;
}
