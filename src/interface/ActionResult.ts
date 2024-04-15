import { ActionDecisionEnum } from 'src/enums/ActionDecisionEnum';
import { Position } from './Position';

export interface ActionResult {
  action?: ActionDecisionEnum;
  success: boolean;
  ballPosition: Position;
}
