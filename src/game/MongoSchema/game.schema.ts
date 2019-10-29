import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema({
  players: [mongoose.Schema.Types.ObjectId],
  playedAt: String,
  winner: mongoose.Schema.Types.ObjectId,
  points: Number,
}, {typeKey: '$type'});
