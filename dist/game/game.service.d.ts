import { Model } from 'mongoose';
import { Game as GameInterface } from './interfaces/game.interface';
import { GameDB } from './models/game.db';
import { createGameParam } from './models/game.params';
import { Profile } from '../profile/models/profile';
import { ProfileService } from '../profile/profile.service';
export declare class GameService {
    private readonly gameModel;
    private profileService;
    constructor(gameModel: Model<GameInterface>, profileService: ProfileService);
    create(data: createGameParam): Promise<GameDB>;
    findOneById(id: string): Promise<GameDB>;
    addPoints(points: number, id: string): Promise<Profile>;
    removePoints(points: number, id: string): Promise<Profile>;
}
