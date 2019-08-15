import * as mongoose from 'mongoose';

export const ProfileSchema = new mongoose.Schema({
  personal: {
    firstName: { $type: String, lowercase: true, trim: true },
    lastName: { $type: String, lowercase: true, trim: true },
    username: String,
    email: String,
    phone: String,
  },
  privacy: {
    password: String,
    resetPasswordToken: String,
    loginFailedAttempts: Number,
  },
  gameStatus: {
    win: { $type: Number, default: 0 },
    lost: { $type: Number, default: 0 },
    status: { $type: Number, default: 0 },
    level: { $type: Number, default: 0 },
    location: {
      type: String,
      coordinates: {$type: [Number]},
    },
  },
  points: {
    points: { $type: Number, default: 0 },
    redeemedPoints: { $type: Number, default: 0 },
    recievedPoints: [{
      id: String,
      sender: String,
      amount: Number,
      timestamp: Date,
    }],
    sentPoints: [{
      id: String,
      recipient: String,
      amount: Number,
      timestamp: Date,
    }],
  },
}, {typeKey: '$type'});
