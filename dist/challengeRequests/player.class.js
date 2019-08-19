"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(id, socketId, opponent = null, state = 'SEARCHING') {
        this.id = null;
        this.socketId = null;
        this.opponent = null;
        this.state = 'SEARCHING';
        this.id = id;
        this.socketId = socketId;
        this.opponent = opponent;
        this.state = state;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.class.js.map