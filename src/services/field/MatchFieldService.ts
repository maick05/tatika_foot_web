import { TeamSide } from 'src/constants/FieldZones';
import { RolePositionEnum } from 'src/enums/RolePositionEnum';
import { MatchField, MatchPlayer } from 'src/interface/MatchField';
import { Position } from 'src/interface/Position';

export class MatchFieldService {
  matchLogs: string[] = [];
  constructor(protected readonly matchField: MatchField) {}

  getMatchField(): MatchField {
    return this.matchField;
  }

  getTeamSide(team): TeamSide {
    return this.matchField.matchInfo.teamHome == team
      ? TeamSide.HOME
      : TeamSide.OUT;
  }

  getTeamSideOpposite(team): TeamSide {
    return this.matchField.matchInfo.teamHome == team
      ? TeamSide.OUT
      : TeamSide.HOME;
  }

  getTeamPlayers(team: string): MatchPlayer[] {
    return this.matchField.players.filter((player) => player.team == team);
  }

  getOpponentPlayers(team: string): MatchPlayer[] {
    return this.matchField.players.filter((player) => player.team !== team);
  }

  movePlayerPosition(playerId: string, position: Position) {
    const playerIndex = this.matchField.players.findIndex(
      (player) => player.id == playerId
    );
    this.matchField.players[playerIndex].position = position;
  }

  setBallPosition(position: Position) {
    this.matchField.ballPosition = position;
  }

  logStep(msg: string) {
    console.log(msg);
    this.matchLogs.push(msg);
  }

  getGoalkeeper(teamOp: string): MatchPlayer {
    return this.matchField.players.find(
      (player) =>
        player.team !== teamOp &&
        player.rolePosition == RolePositionEnum.GOALKEEPER
    );
  }
}
