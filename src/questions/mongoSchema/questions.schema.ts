import * as mongoose from 'mongoose';

export const QuestionsSchema = new mongoose.Schema({
  question: String,
  answers: [{id: String, text: String}],
  correctAnswerId: String,
  diff_level: Number,
  category: {type: String, default: 'general'},
  createdAt: Number,
  updatedAt: Number,
  createdBy: String,
});
// {typeKey: '$type'}
