import { Player } from './player.class';
import { Request } from './request.class';
import { Server } from 'socket.io';
import { QuestionsService } from '../questions/questionsService/questions.service';
import { Answer } from '../questions/models/questions.model';
import { Question } from '../questions/customClass/question.class';
import { Points } from '../points/points.class';
import { PointsService } from '../points/points.service';
export declare class Game {
    private readonly questionService;
    private readonly pointsService;
    server: Server;
    id: string;
    state: string;
    players: Player[];
    points: Points[];
    questions: Question[];
    constructor(questionService: QuestionsService, pointsService: PointsService, request: Request);
    start(server: Server): void;
    getWinner(): Player;
    getLoser(): Player;
    announanceResults(): Promise<void>;
    finishGame(): void;
    submitAnswers(playerId: string, answers: Answer[]): void;
    private _validateAnswers;
    private _eimit;
    readonly isGameOver: boolean;
}
