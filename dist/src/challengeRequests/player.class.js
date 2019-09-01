"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(id, socketId, opponent = null, state = 'SEARCHING') {
        this.id = null;
        this.socketId = null;
        this.opponent = null;
        this.state = 'SEARCHING';
        this.score = 0;
        this.submittedTime = null;
        this.id = id;
        this.socketId = socketId;
        this.opponent = opponent;
        this.state = state;
    }
    setScore(score) {
        this.score = score;
    }
    submit() {
        this.state = 'SUBMITTED';
        this.submittedTime = new Date().getTime();
    }
}
exports.Player = Player;
//# sourceMappingURL=player.class.js.map