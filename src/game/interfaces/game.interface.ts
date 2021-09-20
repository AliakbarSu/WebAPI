import { Document } from 'mongoose';

export interface Game extends Document {
  readonly _id: string;
  readonly players: string[];
  readonly playedAt: string;
  readonly winner: string;
  readonly points: number;
}
