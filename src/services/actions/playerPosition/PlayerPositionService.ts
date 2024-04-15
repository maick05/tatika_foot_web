import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { MatchPlayer } from 'src/interface/MatchField';
import { PassRange } from 'src/constants/PassConstants';

export class PlayerPositionService extends AbstractActionService {
  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
  }

  hasPlayerOnLine(posicaoInicial, posicaoFinal, adversarios: MatchPlayer[]) {
    // Calcula os deltas e os passos necessários para percorrer a linha
    const deltaX = posicaoFinal[0] - posicaoInicial[0];
    const deltaY = posicaoFinal[1] - posicaoInicial[1];
    const passos = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    const incrementoX = deltaX / passos;
    const incrementoY = deltaY / passos;

    let xAtual = posicaoInicial[0];
    let yAtual = posicaoInicial[1];

    // Verifica cada ponto ao longo da linha de passe
    for (let i = 0; i <= passos; i++) {
      xAtual += incrementoX;
      yAtual += incrementoY;

      const xArredondado = Math.round(xAtual);
      const yArredondado = Math.round(yAtual);

      for (const adversario of adversarios) {
        if (
          adversario.position[0] === xArredondado &&
          adversario.position[1] === yArredondado
        ) {
          return true;
        }
      }
    }

    return false;
  }

  closeOpponentPlayer(opponentDestination, opponentPosition) {
    const distancia = this.calculateDistance(
      opponentDestination,
      opponentPosition
    );
    const proximo = distancia <= Math.sqrt(PassRange.SHORT_PASS);
    if (proximo) console.log('Adversário Próximo');
    return proximo;
  }
}
