import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { MatchPlayer } from 'src/interface/MatchField';
import { AbstractEventZones } from 'src/constants/FieldZones';
import { AbstractFieldZoneEnum } from 'src/enums/ActionDecisionEnum';
import { Position } from 'src/interface/Position';

export class ChooseCrossingDestinationService extends AbstractActionService {
  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
  }

  chooseCrossingDestination(crossPlayer: MatchPlayer): {
    destinationPlayer: MatchPlayer;
    destinationPosition: Position;
  } {
    const teamSide = this.matchFieldService.getTeamSideOpposite(
      crossPlayer.team
    );
    const teamPlayers = this.matchFieldService.getTeamPlayers(crossPlayer.team);
    const areaPlayers = teamPlayers.filter((player) =>
      AbstractEventZones[AbstractFieldZoneEnum.AREA][teamSide].some(
        (pos) => pos.y === player.position.y && pos.x === player.position.x
      )
    );

    if (areaPlayers.length > 0) {
      const destinationPlayer =
        this.generateRandomTarget<MatchPlayer>(areaPlayers);
      return {
        destinationPlayer,
        destinationPosition: destinationPlayer.position,
      };
    } else
      return {
        destinationPlayer: null,
        destinationPosition: this.generateRandomTarget<Position>(
          AbstractEventZones[AbstractFieldZoneEnum.AREA][teamSide]
        ),
      };
  }

  private generateRandomTarget<Target>(area: Array<Target>) {
    const randomIndex = Math.floor(Math.random() * area.length);
    return area[randomIndex];
  }
}
