export declare class Answer {
    id: string;
    text: string;
}
export declare class Question {
    id: string;
    question: string;
    answers: Answer[];
    correctAnswerId: string;
    diff_level: number;
    category: string;
    createdAt: number;
    updatedAt: number;
    createdBy: string;
}
