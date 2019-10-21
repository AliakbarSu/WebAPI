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
}, { typeKey: '$type' });
//# sourceMappingURL=game.schema.js.map