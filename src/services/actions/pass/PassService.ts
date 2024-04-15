import { PassDestinationService } from './PassDestinationService';
import { ActionResult } from 'src/interface/ActionResult';
import { AbstractActionService } from '../AbstractActionService';
import { MatchPlayer } from 'src/interface/MatchField';
import { MatchFieldService } from 'src/services/field/MatchFieldService';
import { InterceptationService } from './InterceptationService';
import { PlayerPositionService } from '../playerPosition/PlayerPositionService';
import {
  PENALTY_BY_DISTANCE_FACTOR,
  PassRange,
} from 'src/constants/PassConstants';

export class PassService extends AbstractActionService {
  protected passDestinationService: PassDestinationService;
  protected interceptationService: InterceptationService;
  protected playerPositionService: PlayerPositionService;
  constructor(protected readonly matchFieldService: MatchFieldService) {
    super(matchFieldService);
    this.passDestinationService = new PassDestinationService(matchFieldService);
    this.interceptationService = new InterceptationService(matchFieldService);
    this.playerPositionService = new PlayerPositionService(matchFieldService);
  }

  execute(
    passPlayer: MatchPlayer,
    passRange = PassRange.SHORT_PASS
  ): ActionResult {
    const destinationPlayer =
      this.passDestinationService.chooseDestinationPlayer(
        passPlayer,
        passRange
      );

    return this.executePass(passPlayer, destinationPlayer, passRange);
  }

  executePass(
    passPlayer: MatchPlayer,
    destinationPlayer: MatchPlayer,
    passRange: number
  ): ActionResult {
    const opponentPlayers = this.matchFieldService.getOpponentPlayers(
      passPlayer.team
    );
    const passDistance = this.calculateDistance(
      passPlayer.position,
      destinationPlayer.position
    );
    const passType =
      passDistance <= PassRange.SHORT_PASS ? 'shortPass' : 'longPass';

    if (
      this.playerPositionService.hasPlayerOnLine(
        passPlayer.position,
        destinationPlayer.position,
        opponentPlayers
      )
    )
      this.passWithPlayerOnLine(passPlayer, passType, opponentPlayers);
    else
      this.checkCloseOpponents(
        passPlayer,
        passType,
        destinationPlayer,
        opponentPlayers,
        passRange
      );

    return this.endPass(passPlayer, passType, destinationPlayer, passDistance);
  }

  endPass(
    passPlayer: MatchPlayer,
    passType: string,
    destinationPlayer: MatchPlayer,
    passDistance: number
  ) {
    if (
      this.calculateSucessProb(
        passPlayer.skills[passType],
        1 - passDistance / PENALTY_BY_DISTANCE_FACTOR
      )
    ) {
      console.log('Passe bem-sucedido!');
      return {
        success: true,
        ballPosition: destinationPlayer.position,
      };
    } else {
      console.log('Erro no passe.');
      return {
        success: false,
        ballPosition: this.calculateDetour(
          destinationPlayer.position,
          passPlayer,
          destinationPlayer
        ),
      };
    }
  }

  passWithPlayerOnLine(
    passPlayer: MatchPlayer,
    passType: string,
    opponentPlayers: Array<MatchPlayer>
  ) {
    console.log(
      'Alto risco de interceptação - adversário diretamente na linha de passe.'
    );
    for (const opponent of opponentPlayers) {
      if (
        this.interceptationService.interceptationTry(
          opponent,
          passPlayer,
          passType,
          true
        )
      ) {
        console.log('Passe interceptado pelo adversário na linha de passe!');
        return {
          success: false,
          ballPosition: opponent.position,
        };
      }
    }
  }

  checkCloseOpponents(
    passPlayer: MatchPlayer,
    passType: string,
    destinationPlayer: MatchPlayer,
    opponentPlayers: Array<MatchPlayer>,
    passRange: number
  ) {
    for (const opponent of opponentPlayers)
      this.checkCloseOpponentInterceptation(
        passPlayer,
        passType,
        destinationPlayer,
        opponent,
        passRange
      );
  }

  checkCloseOpponentInterceptation(
    passPlayer: MatchPlayer,
    passType: string,
    destinationPlayer: MatchPlayer,
    opponent: MatchPlayer,
    passRange: number
  ) {
    if (
      this.playerPositionService.closeOpponentPlayer(
        destinationPlayer.position,
        opponent.position
      ) &&
      this.interceptationService.interceptationTry(
        opponent,
        passPlayer,
        passType,
        false
      )
    ) {
      console.log(
        'Passe interceptado pelo adversário próximo ao destinatário!'
      );
      const position =
        this.interceptationService.calculateInterceptationPosition(
          passPlayer,
          destinationPlayer,
          opponent,
          passRange
        );

      const trajectory =
        this.interceptationService.calcularTrajetoriaInterceptacao(
          opponent,
          passPlayer,
          destinationPlayer
        );

      this.matchFieldService.movePlayerPosition(opponent.id, position);
      return {
        success: false,
        ballPosition: !trajectory.opponentPossession
          ? trajectory.newBallPosition
          : position,
      };
    }
  }
}
