"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require('uuid/v1');
class Game {
    constructor(request, questions) {
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
        this._eimit('onGameStarted', this.questions);
    }
    validateAnswers(answers) {
    }
    _eimit(event, data) {
        this.players.forEach((player) => {
            this.server.sockets.sockets[player.socketId].emit(event, data);
        });
    }
}
exports.Game = Game;
//# sourceMappingURL=game.class.js.map