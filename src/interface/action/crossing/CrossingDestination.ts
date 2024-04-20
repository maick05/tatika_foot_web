import { MatchPlayer } from 'src/interface/MatchField';
import { Position } from 'src/interface/Position';

export interface CrossingDestination {
  destinationPlayer: MatchPlayer;
  destinationPosition: Position;
}
