import { ProfileService } from '../profile/profile.service';
import { Game } from './game.class';
import { Inject } from '@nestjs/common';

export class Player {
    id: string = null;
    socketId: string = null;
    opponent: Player = null;
    state: string = 'SEARCHING';
    score: number = 0;
    submittedTime: number = null;
    private readonly profileService: ProfileService;

    constructor(profileService: ProfileService, id, socketId, opponent = null, state = 'SEARCHING') {
        this.id = id;
        this.socketId = socketId;
        this.opponent = opponent;
        this.state = state;
        this.profileService = profileService;
    }

    setScore(score: number) {
        this.score = score;
    }

    submit() {
        this.state = 'SUBMITTED';
        this.submittedTime = new Date().getTime();
    }

    async setPoints(player: Player, game: Game) {
        const isLost = player.state.toLowerCase() === 'lost';
        const profile = await this.profileService.findOneById(player.id);
        const points = profile.points.points;
        const updatedPoints = isLost ? points.splice(0, game.points.length) : points.concat(game.points);
        return this.profileService.updateGameStatus({_id: player.id,
            $inc: {
                'gameStatus.win': isLost ? 0 : 1,
                'gameStatus.lost': isLost ? 1 : 0,
            },
            'points.points': updatedPoints,
        } as any);
    }
}
