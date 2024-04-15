import { Skills } from 'src/schemas/player.schema';
import { Position } from './Position';

export type MatchPlayer = {
  id: string;
  team: string;
  position: Position;
  skills: Partial<Skills>;
};

export interface MatchField {
  players: Array<MatchPlayer>;
  ballPosition: Position;
}
