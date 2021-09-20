import { QuestionsService } from '../../questions/questionsService/questions.service';
import { Question } from '../../questions/customClass/question.class';
import { PointsService } from '../../points/points.service';
import { Game } from '../models/game.model';
export declare class GameUtil {
    private readonly questionService;
    private readonly pointsService;
    id: string;
    state: string;
    questions: Question[];
    constructor(questionService: QuestionsService, pointsService: PointsService);
    newGame(requestToken: string): Promise<Game>;
    static isWinner(scores: Array<{
        playerId: string;
        score: number;
    }>, playerId: string): boolean;
    static players(scores: Array<{
        playerId: string;
        score: number;
    }>): {
        winner: string;
        loser: string;
    };
}
