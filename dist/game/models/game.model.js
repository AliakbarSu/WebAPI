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
const type_graphql_1 = require("type-graphql");
const questions_model_1 = require("../../questions/models/questions.model");
let Opponent = class Opponent {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Opponent.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Opponent.prototype, "username", void 0);
Opponent = __decorate([
    type_graphql_1.ObjectType()
], Opponent);
exports.Opponent = Opponent;
let Game = class Game {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Game.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => [GameQuestion]),
    __metadata("design:type", Array)
], Game.prototype, "questions", void 0);
__decorate([
    type_graphql_1.Field(type => [Opponent]),
    __metadata("design:type", Array)
], Game.prototype, "opponents", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], Game.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Game.prototype, "time", void 0);
Game = __decorate([
    type_graphql_1.ObjectType()
], Game);
exports.Game = Game;
let ExpiredRequest = class ExpiredRequest {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ExpiredRequest.prototype, "sender", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], ExpiredRequest.prototype, "status", void 0);
ExpiredRequest = __decorate([
    type_graphql_1.ObjectType()
], ExpiredRequest);
exports.ExpiredRequest = ExpiredRequest;
let GameToken = class GameToken {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GameToken.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], GameToken.prototype, "players", void 0);
GameToken = __decorate([
    type_graphql_1.ObjectType()
], GameToken);
exports.GameToken = GameToken;
let GameQuestion = class GameQuestion {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], GameQuestion.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], GameQuestion.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GameQuestion.prototype, "question", void 0);
__decorate([
    type_graphql_1.Field(type => [questions_model_1.Answer]),
    __metadata("design:type", Array)
], GameQuestion.prototype, "answers", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GameQuestion.prototype, "correctAnswerId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GameQuestion.prototype, "diff_level", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GameQuestion.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GameQuestion.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GameQuestion.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GameQuestion.prototype, "createdBy", void 0);
GameQuestion = __decorate([
    type_graphql_1.ObjectType()
], GameQuestion);
//# sourceMappingURL=game.model.js.map