import { Answer } from "../models/questions.model";

const uuid = require('uuid');

export class Question {
    id: string = null;
    question: string = null;
    answers: Array<{id: string, text: string}> = [];
    correctAnswerId: string = null;
    diff_level: number;
    category: string;
    requestId?: string;
    createdAt: number;
    updatedAt: number;
    createdBy: string;

    constructor(
        question: string,
        answers: Array<{id: string, text: string}>,
        correctAnswerId: string,
        diff_level: number,
        createdBy: string,
        category = 'general') {
            this.id = uuid();
            this.question = question;
            this.answers = answers;
            this.correctAnswerId = correctAnswerId;
            this.category = category;
            this.diff_level = diff_level;
            this.createdAt = new Date().getTime();
            this.updatedAt = new Date().getTime();
            this.createdBy = createdBy;
    }

    public validate(answers: Answer[]): boolean {
        return answers.map(a => a.id).includes(this.correctAnswerId);
    }
}
