// import { Player } from './player.class';
// import { Request } from './request.class';
import { Server } from 'socket.io';
import { QuestionsService } from '../../questions/questionsService/questions.service';
import { Question as QuestionModel, Answer } from '../../questions/models/questions.model';
import { Question } from '../../questions/customClass/question.class';
// import { Points } from '../points/points.class';
import { PointsService } from '../../points/points.service';
import { Game } from '../models/game.model';
import { Tokeniser } from './token';
const uuid = require('uuid/v1');

export class GameUtil {
    id: string = null;
    state: string = null;
    // players: Player[] = [];
    // points: Points[];
    questions: Question[] = [];
    constructor(
        private readonly questionService: QuestionsService,
        private readonly pointsService: PointsService) {
        // this.id = uuid();
        // this.state = 'PLAYING';
        // this.players = request.acceptedRecipients;
        // this.points = this.pointsService.newPoints(request.points, true);
    }

    async newGame(requestToken: string): Promise<Game> {
        // Assign opponents
        // this.players[0].opponent = this.players[1];
        // this.players[1].opponent = this.players[0];
        // Fetch questions for the game
        const parsedToken = Tokeniser.parse(requestToken);
        const questionsObj = await this.questionService.generateQuestion(4, 1, 'general');
        // questionsObj.forEach((question: QuestionModel) =>
        //         this.questions.push(new Question(
        //             question.question,
        //             question.answers,
        //             question.correctAnswerId,
        //             question.diff_level,
        //             question.createdBy,
        //             question.category)),
        //     );

        return {
            _id: uuid(),
            ...parsedToken.opponents,
            questions: questionsObj,
            createdAt: new Date().getTime().toString(),
        };
    }

    static isWinner(scores: Array<{playerId: string, score: number}>, playerId: string): boolean {
        const foundPlayer = scores.find(p => String(p.playerId) === String(playerId));
        const otherPlayers = scores.filter( p => String(p.playerId) !== String(playerId));
        if (foundPlayer) {
            return !Boolean(otherPlayers.find(p => p.score > foundPlayer.score));
        }
        return false;
    }

    static getWinner(scores: Array<{playerId: string, score: number}>): string {
        const winnerScore = Math.max(...scores.map(s => s.score));
        const player = scores.find(s => s.score === winnerScore);
        return String(player.playerId);
    }

    // async announanceResults() {
    //     // Update players' points and win and lost
    //     const winner: Player = this.getLoser();
    //     const loser: Player = this.getWinner();
    //     await this.players.forEach(player => player.setPoints(player, this));
    //     // if (this.isGameOver) {
    //     this._eimit('onGameResults', 'you have won', winner.socketId);
    //     this._eimit('onGameResults', 'you have lost', loser.socketId);
    //     // }
    // }

    // finishGame() {
    //     if (this.isGameOver) {
    //         this.state = 'COMPLETED';
    //     }
    // }

    // submitAnswers(playerId: string, answers: Answer[]) {
    //     const player = this.players.find((p: Player) => p.id === String(playerId));
    //     const score = this._validateAnswers(answers).correct / this._validateAnswers(answers).total;
    //     player.setScore(score);
    //     player.submit();
    // }

    // private _validateAnswers(answers: Answer[]): {total: number, correct: number, wrong: number} {
    //     let correct = 0;
    //     let wrong = 0;
    //     this.questions.forEach((question: Question) => {
    //         if (question.validate(answers)) {
    //             correct++;
    //         } else {
    //             wrong++;
    //         }
    //     });
    //     return {
    //         total: this.questions.length,
    //         correct,
    //         wrong,
    //     };
    // }

    // private _eimit(event: string, data, socketId?) {
    //     if (socketId) {
    //         this.server.sockets.sockets[socketId].emit(event, data);
    //     } else {
    //         this.players.forEach((player: Player) => {
    //             this.server.sockets.sockets[player.socketId].emit(event, data);
    //         });
    //     }
    // }

    // get isGameOver(): boolean {
    //     let gameOver = true;
    //     this.players.forEach((player: Player) => {
    //         if (player.state !== 'SUBMITTED') {
    //             gameOver = false;
    //         }
    //     });
    //     return gameOver;
    // }
}
