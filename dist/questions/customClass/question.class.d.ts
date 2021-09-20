import { Answer } from "../models/questions.model";
import { AnswerClass } from "./Answer.class";
export declare class Question {
    id: string;
    question: string;
    answers: AnswerClass[];
    correctAnswerId: string;
    diff_level: number;
    category: string;
    requestId?: string;
    createdAt: number;
    updatedAt: number;
    createdBy: string;
    constructor(question: string, answers: Array<{
        id: string;
        text: string;
    }>, correctAnswerId: string, diff_level: number, createdBy: string, category?: string);
    validate(answers: Answer[]): boolean;
}
