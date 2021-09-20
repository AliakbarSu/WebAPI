"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_service_1 = require("../profile/profile.service");
const common_1 = require("@nestjs/common");
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
    setPoints(player, game) {
        const isLost = player.state.toLowerCase() === 'lost';
        this.profileService.update({ _id: player.id,
            gameStatus: {
                $inc: {
                    win: isLost ? 0 : 1,
                    lost: isLost ? 1 : 0,
                },
            },
            points: {
                $inc: {
                    points: game.points.amount,
                },
            },
        });
    }
}
__decorate([
    common_1.Inject('ProfileService'),
    __metadata("design:type", profile_service_1.ProfileService)
], Player.prototype, "profileService", void 0);
exports.Player = Player;
//# sourceMappingURL=player.class.js.map