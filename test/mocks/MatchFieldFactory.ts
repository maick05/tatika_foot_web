import { MatchPlayer, MatchField } from 'src/interface/MatchField';
import { Position } from 'src/interface/Position';

const habilidadesJogador = {
  shortPass: 75, // Habilidade de passe curto
  longPass: 65, // Habilidade de passe longo
  interceptation: 70, // Habilidade de interceptação
};

const posicaoJogadorPasse: Position = [1, 1]; // Jogador que faz o passe
const posicaoDestinatario: Position = [7, 3]; // Destinatário do passe
const posicaoAdversario1: Position = [5, 2]; // Adversário na linha de passe
const posicaoAdversario2: Position = [6, 4]; // Adversário próximo ao destinatário

const jogadores = [
  {
    id: 'passe',
    team: 'A',
    position: posicaoJogadorPasse,
    skills: habilidadesJogador,
  },
  {
    id: 'closePass1',
    team: 'A',
    position: [2, 1],
    skills: habilidadesJogador,
  },
  {
    id: 'closePass2',
    team: 'A',
    position: [1, 0],
    skills: habilidadesJogador,
  },
  {
    id: 'closePassAdvClose',
    team: 'A',
    position: [1, 3],
    skills: habilidadesJogador,
  },
  {
    id: 'dest',
    team: 'A',
    position: posicaoDestinatario,
    skills: habilidadesJogador,
  },
  {
    id: 'advPassLine',
    team: 'B',
    position: posicaoAdversario1,
    skills: { interceptation: habilidadesJogador.interceptation },
  },
  {
    id: 'advProximo',
    team: 'B',
    position: posicaoAdversario2,
    skills: { interceptation: habilidadesJogador.interceptation },
  },
  {
    id: 'advCloseClose',
    team: 'B',
    position: [1, 4] as Position,
    skills: { interceptation: habilidadesJogador.interceptation },
  },
];

export class MatchFieldFactory {
  static buildMatchFieldToPass(): MatchField {
    return {
      players: jogadores as MatchPlayer[],
      ballPosition: posicaoJogadorPasse,
    };
  }
  static buildPassPlayer(): MatchPlayer {
    return {
      id: 'passe',
      team: 'A',
      position: posicaoJogadorPasse,
      skills: habilidadesJogador,
    };
  }
  static buildDestinationPlayer(): MatchPlayer {
    return {
      id: 'dest',
      team: 'A',
      position: posicaoDestinatario,
      skills: habilidadesJogador,
    };
  }
  static buildAdversaries(): MatchPlayer[] {
    return [
      // {
      //   id: 'advPassLine',
      //   position: posicaoAdversario1,
      //   skills: { interceptation: habilidadesJogador.interceptation },
      // },
      {
        id: 'advProximo',
        team: 'B',
        position: posicaoAdversario2,
        skills: { interceptation: habilidadesJogador.interceptation },
      },
    ];
  }
}
