"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(profileService, id, socketId, opponent = null, state = 'SEARCHING') {
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
        this.profileService = profileService;
    }
    setScore(score) {
        this.score = score;
    }
    submit() {
        this.state = 'SUBMITTED';
        this.submittedTime = new Date().getTime();
    }
    async setPoints(player, game) {
        const isLost = player.state.toLowerCase() === 'lost';
        return this.profileService.updateGameStatus({ _id: player.id,
            $inc: {
                'gameStatus.win': isLost ? 0 : 1,
                'gameStatus.lost': isLost ? 1 : 0,
                'points.points': isLost ? -game.points.amount : game.points.amount,
            },
        });
    }
}
exports.Player = Player;
//# sourceMappingURL=player.class.js.map