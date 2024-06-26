import { Physical, Skills, SpecialSkills } from 'src/schemas/player.schema';
import { Position } from './Position';
import { RolePositionEnum } from 'src/enums/RolePositionEnum';

export type MatchPlayer = {
  id: string;
  team: string;
  position: Position;
  skills: Partial<Skills>;
  specialSkills?: Partial<SpecialSkills>;
  physical?: Partial<Physical>;
  rolePosition?: RolePositionEnum;
};

export interface MatchField {
  matchInfo: MatchInfo;
  players: Array<MatchPlayer>;
  ballPosition: Position;
}

export interface MatchInfo {
  teamHome: string;
  teamOut: string;
}
