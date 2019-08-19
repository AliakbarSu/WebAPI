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
let Personal = class Personal {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Personal.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Personal.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Personal.prototype, "avatar", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Personal.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Personal.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Personal.prototype, "phone", void 0);
Personal = __decorate([
    type_graphql_1.ObjectType()
], Personal);
exports.Personal = Personal;
let Privacy = class Privacy {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Privacy.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Privacy.prototype, "resetPasswordToken", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Privacy.prototype, "loginFailedAttempts", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], Privacy.prototype, "roles", void 0);
Privacy = __decorate([
    type_graphql_1.ObjectType()
], Privacy);
exports.Privacy = Privacy;
let Location = class Location {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], Location.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(type => [Number]),
    __metadata("design:type", Array)
], Location.prototype, "coordinates", void 0);
Location = __decorate([
    type_graphql_1.ObjectType()
], Location);
exports.Location = Location;
let GameStatus = class GameStatus {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GameStatus.prototype, "win", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GameStatus.prototype, "lost", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GameStatus.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GameStatus.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => Location),
    __metadata("design:type", Location)
], GameStatus.prototype, "location", void 0);
GameStatus = __decorate([
    type_graphql_1.ObjectType()
], GameStatus);
exports.GameStatus = GameStatus;
let RecievePoints = class RecievePoints {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RecievePoints.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RecievePoints.prototype, "sender", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RecievePoints.prototype, "amount", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], RecievePoints.prototype, "timestamp", void 0);
RecievePoints = __decorate([
    type_graphql_1.ObjectType()
], RecievePoints);
exports.RecievePoints = RecievePoints;
let SendPoints = class SendPoints {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SendPoints.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SendPoints.prototype, "recipient", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], SendPoints.prototype, "amount", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], SendPoints.prototype, "timestamp", void 0);
SendPoints = __decorate([
    type_graphql_1.ObjectType()
], SendPoints);
exports.SendPoints = SendPoints;
let Points = class Points {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Points.prototype, "points", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Points.prototype, "redeemedPoints", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", RecievePoints)
], Points.prototype, "recievedPoints", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", SendPoints)
], Points.prototype, "sentPoints", void 0);
Points = __decorate([
    type_graphql_1.ObjectType()
], Points);
exports.Points = Points;
let Profile = class Profile {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", String)
], Profile.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => Personal),
    __metadata("design:type", Personal)
], Profile.prototype, "personal", void 0);
__decorate([
    type_graphql_1.Field(type => Privacy),
    __metadata("design:type", Privacy)
], Profile.prototype, "privacy", void 0);
__decorate([
    type_graphql_1.Field(type => Points),
    __metadata("design:type", Points)
], Profile.prototype, "points", void 0);
__decorate([
    type_graphql_1.Field(type => GameStatus),
    __metadata("design:type", GameStatus)
], Profile.prototype, "gameStatus", void 0);
Profile = __decorate([
    type_graphql_1.ObjectType()
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=profile.js.map