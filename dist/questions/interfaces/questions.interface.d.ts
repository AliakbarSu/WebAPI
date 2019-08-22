import { Document } from 'mongoose';
export interface Questions extends Document {
    readonly _id: string;
    readonly question: string;
    answers: Answer[];
    correctAnswerId: string;
    diff_level: number;
    category: string;
    createdAt: number;
    updatedAt: number;
    createdBy: string;
}
interface Answer {
    id: string;
    text: string;
}
export {};
