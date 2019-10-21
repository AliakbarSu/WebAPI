import { Answer } from '../../questions/models/questions.model';
export declare class Opponent {
    _id: string;
    username: string;
}
export declare class Game {
    _id: string;
    questions: GameQuestion[];
    opponents: Opponent[];
    createdAt: string;
    time: number;
}
export declare class ExpiredRequest {
    sender: string;
    status: boolean;
}
export declare class GameToken {
    token: string;
    players: string[];
}
declare class GameQuestion {
    _id: string;
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
export {};
