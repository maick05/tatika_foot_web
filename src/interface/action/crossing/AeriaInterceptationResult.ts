import { MatchPlayer } from '../../MatchField';
import { Position } from '../../Position';

export interface AeriaInterceptationResult {
  success: boolean;
  ballPosition: Position;
  interceptationPlayer: MatchPlayer | null;
  eventResulted?: string;
}
