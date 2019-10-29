import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Game as GameInterface } from './interfaces/game.interface';
import flatten from 'flat';
import { GameDB } from './models/game.db';
import { createGameParam } from './models/game.params';
import { Profile, Point } from '../profile/models/profile';
import { ProfileService } from '../profile/profile.service';
import { Points } from '../points/points.class';

@Injectable()
export class GameService {
    constructor(@InjectModel('Game') private readonly gameModel: Model<GameInterface>, private profileService: ProfileService) {
    }

    async create(data: createGameParam): Promise<GameDB> {
        const createdGame = new this.gameModel({
            ...data,
            playedAt: new Date().getTime(),
          });
        return await createdGame.save();
    }

    async findOneById(id: string): Promise<GameDB> {
        return this.gameModel.findOneById(id);
    }

    async addPoints(points: number, id: string): Promise<Profile> {
        const updatedPoints: Point[] = [];
        for (let i = 0; i < points; i++) {
            updatedPoints.push(new Points(1, true));
        }
        console.log(updatedPoints)
        return this.profileService.addPoints(updatedPoints, id);
    }

    async removePoints(points: number, id: string): Promise<Profile> {
        return this.profileService.removePoints(4, id);
    }
}
