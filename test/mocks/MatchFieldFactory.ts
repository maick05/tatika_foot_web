import { MatchPlayer, MatchField, MatchInfo } from 'src/interface/MatchField';
import { Position } from 'src/interface/Position';
import { Physical } from 'src/schemas/player.schema';

const habilidadesJogador = {
  shortPass: 75, // Habilidade de passe curto
  longPass: 65, // Habilidade de passe longo
  interceptation: 70, // Habilidade de interceptação
};

// Alterando para a nova estrutura de objeto
const posicaoJogadorPasse: Position = { y: 1, x: 1 }; // Jogador que faz o passe
const posicaoDestinatario: Position = { y: 7, x: 3 }; // Destinatário do passe
const posicaoAdversario1: Position = { y: 5, x: 2 }; // Adversário na linha de passe
const posicaoAdversario2: Position = { y: 6, x: 4 }; // Adversário próximo ao destinatário

const passPlayers = [
  {
    id: 'passe',
    team: 'A',
    position: posicaoJogadorPasse,
    skills: habilidadesJogador,
  },
  {
    id: 'closePass1',
    team: 'A',
    position: { y: 2, x: 1 },
    skills: habilidadesJogador,
  },
  {
    id: 'closePass2',
    team: 'A',
    position: { y: 1, x: 0 },
    skills: habilidadesJogador,
  },
  {
    id: 'closePassAdvClose',
    team: 'A',
    position: { y: 1, x: 3 },
    skills: habilidadesJogador,
  },
  {
    id: 'dest',
    team: 'A',
    position: posicaoDestinatario,
    skills: habilidadesJogador,
  },
  // Adversários ajustados para o novo formato
  {
    id: 'advProximo',
    team: 'B',
    position: posicaoAdversario2,
    skills: { interceptation: habilidadesJogador.interceptation },
  },
  {
    id: 'advCloseClose',
    team: 'B',
    position: { y: 1, x: 4 },
    skills: { interceptation: habilidadesJogador.interceptation },
  },
];

const physical: Partial<Physical> = {
  height: 1.78,
};

const attackSkills = {
  jumping: 70,
};

const defSkills = {
  defensiveHeading: 70,
  jumping: 70,
};

const crossPlayers = [
  {
    id: 'AreaA1',
    team: 'A',
    position: { y: 1, x: 8 },
    skills: attackSkills,
    physical,
  },
  {
    id: 'AreaA2',
    team: 'A',
    position: { y: 2, x: 8 },
    skills: attackSkills,
    physical,
  },
  {
    id: 'AreaOutA1',
    team: 'A',
    position: { y: 2, x: 7 },
    skills: attackSkills,
    physical,
  },
  {
    id: 'CrossA',
    team: 'A',
    position: { y: 4, x: 8 },
    skills: {
      crossing: 70,
    },
    physical,
  },
  {
    id: 'DefBigAreaB1',
    team: 'B',
    position: { y: 1, x: 8 },
    skills: defSkills,
    physical,
  },
  {
    id: 'DefBigAreaB2',
    team: 'B',
    position: { y: 3, x: 8 },
    skills: defSkills,
    physical,
  },
  {
    id: 'SmallAreaB1',
    team: 'B',
    position: { y: 1, x: 9 },
    skills: defSkills,
    physical,
  },
  { id: '4', team: 'B', position: { y: 0, x: 9 }, skills: {}, physical },
];

export class MatchFieldFactory {
  static buildMatchFieldToCross(): MatchField {
    return {
      matchInfo: MatchFieldFactory.buildMatchInfo(),
      players: crossPlayers as MatchPlayer[],
      ballPosition: crossPlayers[1].position,
    };
  }
  static buildMatchFieldToPass(): MatchField {
    return {
      matchInfo: MatchFieldFactory.buildMatchInfo(),
      players: passPlayers as MatchPlayer[],
      ballPosition: posicaoJogadorPasse,
    };
  }
  static buildMatchInfo(): MatchInfo {
    return {
      teamHome: 'A',
      teamOut: 'B',
    };
  }
  static buildCrossPlayer(): MatchPlayer {
    return crossPlayers[3];
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
      {
        id: 'advProximo',
        team: 'B',
        position: posicaoAdversario2,
        skills: { interceptation: habilidadesJogador.interceptation },
      },
    ];
  }
}
