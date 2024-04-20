/* eslint-disable @typescript-eslint/no-unused-vars */
import { AbstractSchema } from '@devseeder/nestjs-microservices-commons/dist/schema/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema({ timestamps: true, collection: 'player' })
export class Player extends AbstractSchema {
  @Prop({ required: true })
  skills: Skills;
}

export class Physical {
  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  stamina: number;
}

export class Skills {
  @Prop({ required: true })
  improvisation: number;

  @Prop({ required: true })
  ballControl: number;

  @Prop({ required: true })
  dribbling: number;

  @Prop({ required: true })
  shortPass: number;

  @Prop({ required: true })
  longPass: number;

  @Prop({ required: true })
  crossing: number;

  @Prop({ required: true })
  ballDomain: number;

  // Ataque
  @Prop({ required: true })
  offensiveHeading: number;

  @Prop({ required: true })
  longFreeKick: number;

  @Prop({ required: true })
  shortFreeKick: number;

  @Prop({ required: true })
  longShot: number;

  @Prop({ required: true })
  shooting: number;

  @Prop({ required: true })
  aerialKicks: number;

  @Prop({ required: true })
  pivot: number;

  @Prop({ required: true })
  chipShot: number;

  @Prop({ required: true })
  weakFoot: number;

  @Prop({ required: true })
  precisionShot: number;

  @Prop({ required: true })
  curveShot: number;

  @Prop({ required: true })
  strengthShot: number;

  @Prop({ required: true })
  penaltyKick: number;

  @Prop({ required: true })
  cornerKick: number;

  // Físico
  @Prop({ required: true })
  velocity: number;

  @Prop({ required: true })
  aceleration: number;

  @Prop({ required: true })
  strength: number;

  @Prop({ required: true })
  resistance: number;

  @Prop({ required: true })
  agility: number;

  @Prop({ required: true })
  jumping: number;

  @Prop({ required: true })
  balance: number;

  // Condição
  @Prop({ required: true })
  fitness: number;

  @Prop({ required: true })
  consistency: number;

  @Prop({ required: true })
  injuryProneness: number;

  // Mental
  @Prop({ required: true })
  gameVision: number;

  @Prop({ required: true })
  antecipation: number;

  @Prop({ required: true })
  positioning: number;

  @Prop({ required: true })
  creativity: number;

  @Prop({ required: true })
  teamWork: number;

  @Prop({ required: true })
  leadership: number;

  @Prop({ required: true })
  adaptability: number;

  @Prop({ required: true })
  aggressivity: number;

  // Marcação
  @Prop({ required: true })
  marking: number;

  @Prop({ required: true })
  interceptation: number;

  @Prop({ required: true })
  defensiveHeading: number;

  @Prop({ required: true })
  disarm: number;

  @Prop({ required: true })
  blocking: number;

  @Prop({ required: true })
  defensivePositioning: number;

  // Goleiro
  @Prop({ required: true })
  goalkeeperSaves: number;

  @Prop({ required: true })
  goalkeeperReflexes: number;

  @Prop({ required: true })
  goalkeeperPositioning: number;

  @Prop({ required: true })
  goalkeeperPenaltySaving: number;

  @Prop({ required: true })
  goalkeeperComingOffLine: number;

  @Prop({ required: true })
  goalkeeperFootwork: number;

  @Prop({ required: true })
  goalkeeperThrowing: number;

  @Prop({ required: true })
  goalkeeperJumping: number;

  @Prop({ required: true })
  goalkeeperAerealCommand: number;
}

const schema = SchemaFactory.createForClass(Player);
export const PlayerSchema = schema;
