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
    const deltaX = finalPosition.y - initPosition.y;
    const deltaY = finalPosition.x - initPosition.x;
    const cells = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    const incrementX = deltaX / cells;
    const incrementY = deltaY / cells;

    let actualX = initPosition.y;
    let actualY = initPosition.x;

    for (let i = 0; i <= cells; i++) {
      actualX += incrementX;
      actualY += incrementY;

      const roundX = Math.round(actualX);
      const roundY = Math.round(actualY);

      for (const opponent of opponents) {
        if (opponent.position.y === roundY && opponent.position.x === roundX) {
          return true;
        }
      }
    }

    return false;
  }

  checkIfOpponentIsClose(
    opponentDestination: Position,
    opponentPosition: Position,
    closeLenght = CLOSE_OPPONENT_AREA
  ) {
    const distance = this.calculateDistance(
      opponentDestination,
      opponentPosition
    );
    const isClose = distance <= Math.sqrt(closeLenght);
    if (isClose) console.log('Adversário Próximo');
    return isClose;
  }
}
