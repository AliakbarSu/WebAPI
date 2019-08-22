import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import flatten from 'flat';
import { Player } from './player.class';
import { Client, Server} from 'socket.io';
import { Request } from './request.class';
import { Game } from './game.class';

@Injectable()
export class RoomService {
 activeRoom: Player[] = [];
 requestRoom: Request[] = [];
 playingRoom: Game[] = [];

 addToActive(player: Player) {
    this.activeRoom.push(player);
 }

 removeFromActive(id: string) {
    this.activeRoom = this.activeRoom.filter((player: Player) => {
        return player.id !== id;
    });
 }

 getReadyPlayers(ids: string[]): Player[] {
    return this.activeRoom.filter((player: Player) => {
        return ids.includes(player.id);
    });
 }

 addToRequests(request: Request) {
    this.requestRoom.push(request);
 }

 removeFromRequests(id: string) {
    this.requestRoom = this.requestRoom.filter((request: Request) => {
        return request.id !== id;
    });
}

 addToPlaying(gameObj: Game) {
    this.playingRoom.push(gameObj);
 }

  getActiveGame(gameId: string): Game {
     return this.playingRoom.find((game: Game) => game.id === gameId);
  }

 removeFromPlaying(id: string) {
    this.playingRoom = this.playingRoom.filter((game: Game) => {
        return game.id !== id;
    });
}

}
