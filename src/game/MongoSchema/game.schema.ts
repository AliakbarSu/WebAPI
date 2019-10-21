import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema({
  opponents: [String],
  questions: [{
    _id: String,
    question: String,
    answers: [{
        _id: String,
        text: String,
        isCorrect: Boolean,
    }],
  }],
  createdAt: Date,
}, {typeKey: '$type'});
