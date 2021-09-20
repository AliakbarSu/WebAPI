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
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
let SendChallengeRequest = class SendChallengeRequest {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], SendChallengeRequest.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    class_validator_1.MaxLength(15),
    class_validator_1.MinLength(2),
    __metadata("design:type", String)
], SendChallengeRequest.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(type => Number),
    class_validator_1.Max(10),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], SendChallengeRequest.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => Number),
    class_validator_1.IsNumber(),
    class_validator_1.Max(30),
    class_validator_1.Min(5),
    __metadata("design:type", Number)
], SendChallengeRequest.prototype, "points", void 0);
SendChallengeRequest = __decorate([
    type_graphql_1.InputType()
], SendChallengeRequest);
exports.SendChallengeRequest = SendChallengeRequest;
//# sourceMappingURL=sendChallengeRequest.js.map