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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const profile_service_1 = require("../profile/profile.service");
const points_class_1 = require("../points/points.class");
let GameService = class GameService {
    constructor(gameModel, profileService) {
        this.gameModel = gameModel;
        this.profileService = profileService;
    }
    async create(data) {
        const createdGame = new this.gameModel(Object.assign({}, data, { playedAt: new Date().getTime() }));
        return await createdGame.save();
    }
    async findOneById(id) {
        return this.gameModel.findOneById(id);
    }
    async addPoints(points, id) {
        const updatedPoints = [];
        for (let i = 0; i < points; i++) {
            updatedPoints.push(new points_class_1.Points(1, true));
        }
        console.log(updatedPoints);
        return this.profileService.addPoints(updatedPoints, id);
    }
    async removePoints(points, id) {
        return this.profileService.removePoints(4, id);
    }
};
GameService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Game')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, profile_service_1.ProfileService])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map