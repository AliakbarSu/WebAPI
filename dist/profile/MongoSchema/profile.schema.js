"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const currentDate = moment_1.default().format();
const defaultPoints = [
    {
        amount: 1,
        sendable: false,
        created_at: currentDate,
    }, {
        amount: 1,
        sendable: false,
        created_at: currentDate,
    },
    {
        amount: 1,
        sendable: false,
        created_at: currentDate,
    },
    {
        amount: 1,
        sendable: false,
        created_at: currentDate,
    },
    {
        amount: 1,
        sendable: false,
        created_at: currentDate,
    }
];
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
        status: {
            online: { $type: Number, default: 0 },
            lastOnline: { $type: Date, default: currentDate },
            lastLoggedIn: { $type: Date, default: currentDate },
            onlineTime: { $type: Number, default: 0 },
        },
        level: { $type: Number, default: 0 },
        location: {
            type: { $type: String, default: 'Point' },
            coordinates: { $type: [Number], default: [(Math.random() * (179) + 1).toFixed(6), (Math.random() * (89) + 1).toFixed(6)] },
        },
        request: {
            status: String,
            opponent: mongoose.Schema.Types.ObjectId,
            created_at: Number,
            updated_at: Number,
        },
    },
    points: {
        points: { $type: [{
                    amount: Number,
                    sendable: Boolean,
                    createdAt: Number,
                }], default: defaultPoints },
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
exports.ProfileSchema.index({ 'gameStatus.location': '2dsphere' });
//# sourceMappingURL=profile.schema.js.map