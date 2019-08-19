import { Player } from './player.class';
import { Request } from './request.class';
import { Game } from './game.class';
export declare class RoomService {
    activeRoom: Player[];
    requestRoom: Request[];
    playingRoom: Game[];
    addToActive(player: Player): void;
    removeFromActive(id: string): void;
    getReadyPlayers(ids: string[]): Player[];
    addToRequests(request: Request): void;
    removeFromRequests(id: string): void;
    addToPlaying(gameObj: Game): void;
    removeFromPlaying(id: string): void;
}
