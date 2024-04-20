import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { AbstractActionService } from '../AbstractActionService';
import { MatchPlayer } from 'src/interface/MatchField';
import { Position } from 'src/interface/Position';
import {
  MinPassDistance,
  PassProb,
  PassRange,
} from 'src/constants/PassConstants';

export class PassDestinationService extends AbstractActionService {
  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
  }

  chooseDestinationPlayer(
    playerPosition: MatchPlayer,
    passRange = PassRange.SHORT_PASS
  ) {
    const minDistance =
      passRange === PassRange.SHORT_PASS
        ? MinPassDistance.SHORT_PASS
        : MinPassDistance.LONG_PASS;
    const possibleOpponents = [];
    const probabillities = [];
    const teamPlayers = this.matchFieldService.getTeamPlayers(
      playerPosition.team
    );

    for (const player of teamPlayers) {
      if (player.id == playerPosition.id) continue;

      const distance = this.calculateDistance(
        playerPosition.position,
        player.position
      );

      if (distance > passRange || distance < minDistance) continue;

      const probabilidade =
        distance === PassRange.SHORT_PASS - 1
          ? PassProb.SHORT_PASS
          : PassProb.LONG_PASS;

      probabillities.push(probabilidade);
      possibleOpponents.push(player);
    }

    this.adjustProbsByCloseOpponents(
      playerPosition,
      possibleOpponents,
      probabillities,
      passRange
    );
    const destIndex = this.selectByProb(possibleOpponents, probabillities);
    return possibleOpponents[destIndex];
  }

  selectByProb(possibleDestinations = [], probs = []) {
    const probSum = probs.reduce((sum, prob) => sum + prob, 0);
    const random = Math.random() * probSum;
    let acumulated = 0;
    for (let i = 0; i < possibleDestinations.length; i++) {
      acumulated += probs[i];
      if (random <= acumulated) return i;
    }
    // Como backup, retorna o último índice caso algo inesperado aconteça
    return possibleDestinations.length - 1;
  }

  adjustProbsByCloseOpponents(
    playerPosition: MatchPlayer,
    possibleDestinations: MatchPlayer[],
    probs = [],
    passRange: number
  ) {
    const penaltyByCloseOpponent = PassProb.CLOSE_OPPONENT;
    for (let i = 0; i < possibleDestinations.length; i++) {
      const position = possibleDestinations[i].position;
      const closeOpponents = this.countCloseOpponents(
        playerPosition,
        position,
        passRange
      );
      if (closeOpponents > 0)
        probs[i] *= 1 - penaltyByCloseOpponent * closeOpponents;
    }
  }

  countCloseOpponents(
    playerPosition: MatchPlayer,
    position: Position,
    passRange: number
  ) {
    let count = 0;
    const opponentsPlayers = this.matchFieldService.getOpponentPlayers(
      playerPosition.team
    );
    for (const opponent of opponentsPlayers) {
      const distance = this.calculateDistance(position, opponent.position);
      if (distance <= passRange) count++;
    }
    return count;
  }
}
