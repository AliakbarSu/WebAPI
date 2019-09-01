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
exports.QuestionsSchema = new mongoose.Schema({
    question: String,
    answers: [{ id: String, text: String }],
    correctAnswerId: String,
    diff_level: Number,
    category: { type: String, default: 'general' },
    createdAt: Number,
    updatedAt: Number,
    createdBy: String,
});
//# sourceMappingURL=questions.schema.js.map