import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { MatchPlayer } from 'src/interface/MatchField';
import { Position } from 'src/interface/Position';
import { CLOSE_OPPONENT_AREA } from 'src/constants/InterceptationConstants';

export class PlayerPositionService extends AbstractActionService {
  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
  }

  hasPlayerOnLine(
    initPosition: Position,
    finalPosition: Position,
    opponents: MatchPlayer[]
  ) {
    const deltaX = finalPosition[0] - initPosition[0];
    const deltaY = finalPosition[1] - initPosition[1];
    const cells = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    const incrementX = deltaX / cells;
    const incrementY = deltaY / cells;

    let actualX = initPosition[0];
    let actualY = initPosition[1];

    for (let i = 0; i <= cells; i++) {
      actualX += incrementX;
      actualY += incrementY;

      const roundX = Math.round(actualX);
      const roundY = Math.round(actualY);

      for (const opponent of opponents) {
        if (
          opponent.position[0] === roundX &&
          opponent.position[1] === roundY
        ) {
          return true;
        }
      }
    }

    return false;
  }

  closeOpponentPlayer(
    opponentDestination: Position,
    opponentPosition: Position
  ) {
    const distance = this.calculateDistance(
      opponentDestination,
      opponentPosition
    );
    const isClose = distance <= Math.sqrt(CLOSE_OPPONENT_AREA);
    if (isClose) console.log('Adversário Próximo');
    return isClose;
  }
}
