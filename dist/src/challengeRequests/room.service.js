"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let RoomService = class RoomService {
    constructor() {
        this.activeRoom = [];
        this.requestRoom = [];
        this.playingRoom = [];
    }
    addToActive(player) {
        this.activeRoom.push(player);
    }
    removeFromActive(id) {
        this.activeRoom = this.activeRoom.filter((player) => {
            return player.id !== id;
        });
    }
    getReadyPlayers(ids) {
        return this.activeRoom.filter((player) => {
            return ids.includes(player.id);
        });
    }
    addToRequests(request) {
        this.requestRoom.push(request);
    }
    removeFromRequests(id) {
        this.requestRoom = this.requestRoom.filter((request) => {
            return request.id !== id;
        });
    }
    addToPlaying(gameObj) {
        this.playingRoom.push(gameObj);
    }
    getActiveGame(gameId) {
        return this.playingRoom.find((game) => game.id === gameId);
    }
    removeFromPlaying(id) {
        this.playingRoom = this.playingRoom.filter((game) => {
            return game.id !== id;
        });
    }
};
RoomService = __decorate([
    common_1.Injectable()
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map