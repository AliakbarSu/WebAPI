import { Player } from './player.class';
import { Request } from './request.class';
import { Server } from 'socket.io';
import { QuestionsService } from '../questions/questionsService/questions.service';
import { Question as QuestionModel, Answer } from '../questions/models/questions.model';
import { Question } from '../questions/customClass/question.class';
import { Points } from './points.class';
const uuid = require('uuid/v1');

export class Game {
    server: Server;
    id: string = null;
    state: string = null;
    players: Player[] = [];
    points: Points;
    questions: Question[] = [];
    constructor(private readonly questionService: QuestionsService, request: Request) {
        this.id = uuid();
        this.state = 'PLAYING';
        this.players = request.acceptedRecipients;
        this.points = new Points(request.points);
    }

    start(server: Server) {
        this.server = server;
        // Assign opponents
        // this.players[0].opponent = this.players[1];
        // this.players[1].opponent = this.players[0];
        // Fetch questions for the game
        this.questionService.generateQuestion(4, 1, 'general').then((quests: QuestionModel[]) => {
            quests.forEach((question: QuestionModel) =>
                this.questions.push(new Question(
                    question.question,
                    question.answers,
                    question.correctAnswerId,
                    question.diff_level,
                    question.createdBy,
                    question.category)),
            );
            this._eimit('onGameStarted', {
                questions: this.questions,
                id: this.id,
            });
        });
    }

    getWinner(): Player {
        let player = this.players[0];
        this.players.forEach((p: Player) => {
            if (p.score > player.score) {
                player = p;
            }
        });
        player.state = 'WON';
        return player;
    }

    getLoser(): Player {
        let player = this.players[0];
        this.players.forEach((p: Player) => {
            if (p.score < player.score) {
                player = p;
            }
        });
        player.state = 'LOST';
        return player;
    }

    async announanceResults() {
        // Update players' points and win and lost
        const winner: Player = this.getLoser();
        const loser: Player = this.getWinner();
        await this.players.forEach(player => player.setPoints(player, this));
        // if (this.isGameOver) {
        this._eimit('onGameResults', 'you have won', winner.socketId);
        this._eimit('onGameResults', 'you have lost', loser.socketId);
        // }
    }

    finishGame() {
        if (this.isGameOver) {
            this.state = 'COMPLETED';
        }
    }

    submitAnswers(playerId: string, answers: Answer[]) {
        const player = this.players.find((p: Player) => p.id === String(playerId));
        const score = this._validateAnswers(answers).correct / this._validateAnswers(answers).total;
        player.setScore(score);
        player.submit();
    }

    private _validateAnswers(answers: Answer[]): {total: number, correct: number, wrong: number} {
        let correct = 0;
        let wrong = 0;
        this.questions.forEach((question: Question) => {
            if (question.validate(answers)) {
                correct++;
            } else {
                wrong++;
            }
        });
        return {
            total: this.questions.length,
            correct,
            wrong,
        };
    }

    private _eimit(event: string, data, socketId?) {
        if (socketId) {
            this.server.sockets.sockets[socketId].emit(event, data);
        } else {
            this.players.forEach((player: Player) => {
                this.server.sockets.sockets[player.socketId].emit(event, data);
            });
        }
    }

    get isGameOver(): boolean {
        let gameOver = true;
        this.players.forEach((player: Player) => {
            if (player.state !== 'SUBMITTED') {
                gameOver = false;
            }
        });
        return gameOver;
    }
}
