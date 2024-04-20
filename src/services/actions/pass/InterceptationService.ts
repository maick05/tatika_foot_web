import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { MatchPlayer } from 'src/interface/MatchField';
import { Position } from 'src/interface/Position';
import { InterceptationFactor } from 'src/constants/InterceptationConstants';

export class InterceptationService extends AbstractActionService {
  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
  }

  interceptationTry(
    opponent: MatchPlayer,
    playerPass: MatchPlayer,
    passType: string,
    passLine: boolean
  ): boolean {
    const interceptationFactor = passLine
      ? InterceptationFactor.PASS_LINE
      : InterceptationFactor.CLOSE_OPPONENT;
    const interceptation = this.calculateOscilationResult(
      opponent.skills.interceptation
    );
    const pass = this.calculateOscilationResult(playerPass.skills[passType]);

    return interceptation > pass * interceptationFactor;
  }

  calculateInterceptationPosition(
    passPlayer: MatchPlayer,
    destination: MatchPlayer,
    opponent: MatchPlayer,
    passRange: number
  ): Position {
    const deltaY = destination.position.y - passPlayer.position.y;
    const deltaX = destination.position.x - passPlayer.position.x;
    const steps = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    const incrementoX = deltaX / steps;
    const incrementoY = deltaY / steps;

    let actualX = passPlayer.position.y;
    let actualY = passPlayer.position.x;

    for (let i = 0; i <= steps; i++) {
      actualX += incrementoX;
      actualY += incrementoY;
      const opponentDistance = Math.sqrt(
        Math.pow(opponent.position.y - actualX, passRange) +
          Math.pow(opponent.position.x - actualY, passRange)
      );
      if (opponentDistance <= passRange)
        return { y: Math.round(actualY), x: Math.round(actualX) };
    }

    return opponent.position;
  }

  calculateInterceptationTrajectory(
    interceptator: MatchPlayer,
    passPlayer: MatchPlayer,
    destination: MatchPlayer
  ) {
    const interceptacaoCompleta = this.calculateSucessProb(
      interceptator.skills.interceptation
    );
    if (!interceptacaoCompleta) {
      return {
        opponentPossession: false,
        newBallPosition: this.calculateDetour(
          interceptator.position,
          destination.position,
          3
        ),
      };
    }
    console.log('Bola fica com o adversário.');
    return {
      opponentPossession: true,
      newBallPosition: interceptator.position,
    };
  }
}
