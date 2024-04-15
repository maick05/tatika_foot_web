import {
  DefaultLimitSucessProb,
  OscilationConstants,
} from 'src/constants/OscilationConstants';
import { MatchFieldService } from '../field/MatchFieldService';
import { Position } from 'src/interface/Position';
import { MatchPlayer } from 'src/interface/MatchField';
import { FieldLenght } from 'src/constants/FieldConstants';

export abstract class AbstractActionService {
  constructor(protected readonly matchFieldService: MatchFieldService) {}
  calculateDistance(position1, position2) {
    return Math.sqrt(
      Math.pow(position1[0] - position2[0], 2) +
        Math.pow(position1[1] - position2[1], 2)
    );
  }

  calculateOscilationResult(value: number): number {
    // Define a probabilidade de oscilação controlada
    const probControl = OscilationConstants.PROB_CONTROL; // 70% das vezes

    // Define o limite de oscilação para a oscilação controlada
    const controlLimitOscilation = OscilationConstants.CONTROL_LIMIT_OSCILATION; // 45% para baixo do valor original

    // Gera um número aleatório para determinar o tipo de oscilação
    const randomOscilationTypeNumber = Math.random();

    // Calcula o valor oscilado com base no tipo de oscilação
    if (randomOscilationTypeNumber < probControl) {
      // Oscilação controlada: oscila até 35% para baixo do valor original
      const oscilation = 1 - Math.random() * controlLimitOscilation;
      return value * oscilation;
    } else {
      // Oscilação total: pode oscilar de 0% a 100% do valor
      const oscilacao = Math.random();
      return value * oscilacao;
    }
  }

  calculateSucessProb(
    value: number,
    penalty = 1,
    limitBase = DefaultLimitSucessProb.LIMIT_BASE,
    comparationValue = DefaultLimitSucessProb.COMPARATION_VALUE,
    underLimitFactor = DefaultLimitSucessProb.UNDER_LIMIT_BASE
  ) {
    const valorDescontado = value * penalty;
    const valorAleatorio = this.calculateOscilationResult(valorDescontado);
    const resultadoLimite = this.calculateOscilationResult(
      value > limitBase ? comparationValue : valorDescontado * underLimitFactor
    );
    const resultado = valorAleatorio > resultadoLimite;
    return resultado;
  }

  calculateDetour(
    detourPosition: Position,
    originPlayer: MatchPlayer,
    destination: MatchPlayer
  ): Position {
    const detourAngle = (Math.random() * Math.PI) / 4 - Math.PI / 8; // Desvio de até 45 graus para qualquer lado
    const detourDistance = Math.random() * 1;

    const deltaX = destination.position[0] - originPlayer.position[0];
    const deltaY = destination.position[1] - originPlayer.position[1];
    const originAngle = Math.atan2(deltaY, deltaX);

    const finalAngle = originAngle + detourAngle;

    let newPositionX = Math.round(
      detourPosition[0] + Math.cos(finalAngle) * detourDistance
    );
    let newPositionY = Math.round(
      detourPosition[1] + Math.sin(finalAngle) * detourDistance
    );

    newPositionX = Math.max(0, Math.min(newPositionX, FieldLenght.WIDTH));
    newPositionY = Math.max(0, Math.min(newPositionY, FieldLenght.HEIGHT));
    console.log('Bola foi para longe...');
    return [newPositionX, newPositionY];
  }
}
