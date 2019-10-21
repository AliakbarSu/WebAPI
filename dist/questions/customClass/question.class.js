"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require('uuid');
class Question {
    constructor(question, answers, correctAnswerId, diff_level, createdBy, category = 'general') {
        this.id = null;
        this.question = null;
        this.answers = [];
        this.correctAnswerId = null;
        this.id = uuid();
        this.question = question;
        this.answers = [{ id: 'fskfjsf', text: 'fksfjskfjk' }];
        this.correctAnswerId = correctAnswerId;
        this.category = category;
        this.diff_level = diff_level;
        this.createdAt = new Date().getTime();
        this.updatedAt = new Date().getTime();
        this.createdBy = createdBy;
    }
    validate(answers) {
        return answers.map(a => a.id).includes(this.correctAnswerId);
    }
}
exports.Question = Question;
//# sourceMappingURL=question.class.js.map