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
const profile_1 = require("../../profile/models/profile");
let Request = class Request {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Request.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], Request.prototype, "points", void 0);
__decorate([
    type_graphql_1.Field(type => profile_1.Profile),
    __metadata("design:type", profile_1.Profile)
], Request.prototype, "sender", void 0);
__decorate([
    type_graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], Request.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => profile_1.Profile),
    __metadata("design:type", profile_1.Profile)
], Request.prototype, "opponents", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], Request.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], Request.prototype, "time", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], Request.prototype, "createdAt", void 0);
Request = __decorate([
    type_graphql_1.ObjectType()
], Request);
exports.Request = Request;
//# sourceMappingURL=request.model.js.map