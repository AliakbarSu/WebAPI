"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
exports.ProfileSchema = new mongoose.Schema({
    personal: {
        firstName: { $type: String, lowercase: true, trim: true },
        lastName: { $type: String, lowercase: true, trim: true },
        avatar: { $type: String, default: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png' },
        username: String,
        email: String,
        phone: String,
    },
    privacy: {
        password: String,
        resetPasswordToken: String,
        loginFailedAttempts: Number,
        roles: { $type: [String], default: 'player' },
    },
    gameStatus: {
        win: { $type: Number, default: 0 },
        lost: { $type: Number, default: 0 },
        status: { $type: Number, default: 0 },
        level: { $type: Number, default: 0 },
        location: {
            type: String,
            coordinates: { $type: [Number] },
        },
        request: {
            status: String,
            opponent: mongoose.Schema.Types.ObjectId,
            created_at: Number,
            updated_at: Number,
        },
    },
    points: {
        points: [{
                amount: Number,
                sendable: Boolean,
                createdAt: Number,
            }],
        targetPoints: { $type: Number, default: 10 },
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
}, { typeKey: '$type' });
//# sourceMappingURL=profile.schema.js.map