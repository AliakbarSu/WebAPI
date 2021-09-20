import { Player } from './player.class';
import { Request } from './request.class';
import { Server } from 'socket.io';
import { QuestionsService } from '../questions/questionsService/questions.service';
import { Answer } from '../questions/models/questions.model';
import { Question } from '../questions/customClass/question.class';
import { Points } from './points.class';
export declare class Game {
    private readonly questionService;
    server: Server;
    id: string;
    state: string;
    players: Player[];
    points: Points;
    questions: Question[];
    constructor(questionService: QuestionsService, request: Request);
    start(server: Server): void;
    getWinner(): Player;
    getLoser(): Player;
    announanceResults(): void;
    finishGame(): void;
    submitAnswers(playerId: string, answers: Answer[]): void;
    private _validateAnswers;
    private _eimit;
    readonly isGameOver: boolean;
}
