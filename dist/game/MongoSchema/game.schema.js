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
exports.GameSchema = new mongoose.Schema({
    players: [mongoose.Schema.Types.ObjectId],
    playedAt: String,
    winner: mongoose.Schema.Types.ObjectId,
    points: Number,
}, { typeKey: '$type' });
//# sourceMappingURL=game.schema.js.map