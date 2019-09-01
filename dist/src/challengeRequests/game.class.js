"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const question_class_1 = require("../questions/customClass/question.class");
const uuid = require('uuid/v1');
class Game {
    constructor(questionService, request) {
        this.questionService = questionService;
        this.id = null;
        this.state = null;
        this.players = [];
        this.questions = [];
        this.id = uuid();
        this.state = 'PLAYING';
        this.players = request.acceptedRecipients;
    }
    start(server) {
        this.server = server;
        this.questionService.generateQuestion(4, 1, 'general').then((quests) => {
            quests.forEach((question) => this.questions.push(new question_class_1.Question(question.question, question.answers, question.correctAnswerId, question.diff_level, question.createdBy, question.category)));
            this._eimit('onGameStarted', {
                questions: this.questions,
                id: this.id,
            });
        });
    }
    getWinner() {
        let player = this.players[0];
        this.players.forEach((p) => {
            if (p.score > player.score) {
                player = p;
            }
        });
        player.state = 'WON';
        return player;
    }
    getLoser() {
        let player = this.players[0];
        this.players.forEach((p) => {
            if (p.score < player.score) {
                player = p;
            }
        });
        player.state = 'LOST';
        return player;
    }
    announanceResults() {
        if (this.isGameOver) {
            this._eimit('onGameResults', this.getWinner(), this.getWinner().socketId);
            this._eimit('onGameResults', this.getLoser(), this.getLoser().socketId);
        }
    }
    finishGame() {
        if (this.isGameOver) {
            this.state = 'COMPLETED';
        }
    }
    submitAnswers(playerId, answers) {
        const player = this.players.find((p) => p.id === playerId);
        const score = this._validateAnswers(answers).correct / this._validateAnswers(answers).total;
        player.setScore(score);
        player.submit();
    }
    _validateAnswers(answers) {
        let correct = 0;
        let wrong = 0;
        this.questions.forEach((question) => {
            if (question.validate(answers)) {
                correct++;
            }
            else {
                wrong++;
            }
        });
        return {
            total: this.questions.length,
            correct,
            wrong,
        };
    }
    _eimit(event, data, socketId) {
        if (socketId) {
            this.server.sockets.sockets[socketId].emit(event, data);
        }
        else {
            this.players.forEach((player) => {
                this.server.sockets.sockets[player.socketId].emit(event, data);
            });
        }
    }
    get isGameOver() {
        let gameOver = true;
        this.players.forEach((player) => {
            if (player.state !== 'SUBMITTED') {
                gameOver = false;
            }
        });
        return gameOver;
    }
}
exports.Game = Game;
//# sourceMappingURL=game.class.js.map