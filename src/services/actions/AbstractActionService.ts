import {
  DefaultLimitSucessProb,
  OscilationConstants,
} from 'src/constants/OscilationConstants';
import { MatchFieldService } from '../field/MatchFieldService';
import { Position } from 'src/interface/Position';
import { FieldLenght } from 'src/constants/FieldConstants';
import { AbstractEventZones } from 'src/constants/FieldZones';
import {
  AbstractFieldZoneEnum,
  EventZoneEnum,
} from 'src/enums/ActionDecisionEnum';
import { PenaltyProbs } from 'src/constants/EventConstants';

export abstract class AbstractActionService {
  constructor(protected readonly matchFieldService: MatchFieldService) {}
  protected calculateDistance(position1: Position, position2: Position) {
    return Math.sqrt(
      Math.pow(position1.y - position2.y, 2) +
        Math.pow(position1.x - position2.x, 2)
    );
  }

  protected calculateOscilationResult(value: number): number {
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

  protected calculateSucessProb(
    value: number,
    penalty = 1,
    limitBase = DefaultLimitSucessProb.LIMIT_BASE,
    comparationValue = DefaultLimitSucessProb.COMPARATION_VALUE,
    underLimitFactor = DefaultLimitSucessProb.UNDER_LIMIT_BASE
  ): boolean {
    const valorDescontado = value * penalty;
    const valorAleatorio = this.calculateOscilationResult(valorDescontado);
    const resultadoLimite = this.calculateOscilationResult(
      value > limitBase ? comparationValue : valorDescontado * underLimitFactor
    );
    const resultado = valorAleatorio > resultadoLimite;
    return resultado;
  }

  protected calculateDetour(
    originPosition: Position,
    destinationPosition: Position,
    maxDetour: number = FieldLenght.WIDTH
  ): Position {
    const deltaX = destinationPosition.y - originPosition.y;
    const deltaY = destinationPosition.x - originPosition.x;

    const detourX = deltaX + (Math.random() * 2 * maxDetour - maxDetour); // Isso cria um desvio aleatório em torno de deltaX
    const detourY = deltaY + (Math.random() * 2 * maxDetour - maxDetour); // Isso cria um desvio aleatório em torno de deltaY

    // Aplicar o desvio
    let newPositionX = originPosition.y + detourX;
    let newPositionY = originPosition.x + detourY;

    // Garantir que a nova posição esteja dentro dos limites do campo
    newPositionX = Math.round(
      Math.max(0, Math.min(newPositionX, FieldLenght.HEIGHT))
    );
    newPositionY = Math.round(
      Math.max(0, Math.min(newPositionY, FieldLenght.WIDTH))
    );

    console.log(`Desvio Máximo de ${maxDetour}`);

    console.log('Bola foi para longe...');
    return { x: newPositionX, y: newPositionY };
  }

  getCornerPosition(team: string, position: Position): Position {
    const teamSide = this.matchFieldService.getTeamSide(team);
    let cornerSide =
      position.y < 3
        ? AbstractFieldZoneEnum.CORNER_UP
        : AbstractFieldZoneEnum.CORNER_DOWN;

    if (position.y == 3)
      cornerSide =
        Math.random() * 2 < 1
          ? AbstractFieldZoneEnum.CORNER_UP
          : AbstractFieldZoneEnum.CORNER_DOWN;

    const cornerPosition =
      AbstractEventZones[EventZoneEnum.CORNER][teamSide][cornerSide];
    return cornerPosition;
  }

  protected calculatePenalty(
    penaltyTeam,
    chance = PenaltyProbs.DEFAULT_PROB,
    agressivityFactor = 0
  ): {
    penalty: boolean;
    position?: Position;
    type?: string;
  } {
    const factor = chance * (1 + agressivityFactor);
    console.log(factor);
    const penalty = this.calculateSucessProb(factor);
    console.log('penalty');
    console.log(penalty);
    return { penalty, position: this.getPenaltyPosition(penaltyTeam) };
  }

  private getPenaltyPosition(penaltyTeam): Position {
    const teamSide = this.matchFieldService.getTeamSide(penaltyTeam);
    return AbstractEventZones[EventZoneEnum.PENALTY][teamSide];
  }
}
