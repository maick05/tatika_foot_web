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
    const deltaX = destination.position[0] - passPlayer.position[0];
    const deltaY = destination.position[1] - passPlayer.position[1];
    const steps = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    const incrementoX = deltaX / steps;
    const incrementoY = deltaY / steps;

    let actualX = passPlayer.position[0];
    let actualY = passPlayer.position[1];

    for (let i = 0; i <= steps; i++) {
      actualX += incrementoX;
      actualY += incrementoY;
      const opponentDistance = Math.sqrt(
        Math.pow(opponent.position[0] - actualX, passRange) +
          Math.pow(opponent.position[1] - actualY, passRange)
      );
      if (opponentDistance <= passRange)
        return [Math.round(actualX), Math.round(actualY)];
    }

    return opponent.position;
  }

  calcularTrajetoriaInterceptacao(
    interceptador: MatchPlayer,
    jogadorPasse: MatchPlayer,
    destinatario: MatchPlayer
  ) {
    const interceptacaoCompleta = this.calculateSucessProb(
      interceptador.skills.interceptation
    );
    if (!interceptacaoCompleta) {
      return {
        opponentPossession: false,
        newBallPosition: this.calculateDetour(
          interceptador.position,
          jogadorPasse,
          destinatario
        ),
      };
    }
    console.log('Bola fica com o adversário.');
    return {
      adversarioComPosse: true,
      newBallPosition: interceptador.position,
    };
  }
}
