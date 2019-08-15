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
let PersonalInput = class PersonalInput {
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.MaxLength(30),
    class_validator_1.MinLength(1),
    __metadata("design:type", String)
], PersonalInput.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.MaxLength(30),
    class_validator_1.MinLength(1),
    __metadata("design:type", String)
], PersonalInput.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], PersonalInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], PersonalInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], PersonalInput.prototype, "email", void 0);
PersonalInput = __decorate([
    type_graphql_1.InputType()
], PersonalInput);
let LocationInput = class LocationInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LocationInput.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(type => [Number]),
    __metadata("design:type", Array)
], LocationInput.prototype, "coordinates", void 0);
LocationInput = __decorate([
    type_graphql_1.InputType()
], LocationInput);
let GameStatusInput = class GameStatusInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], GameStatusInput.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => LocationInput),
    __metadata("design:type", LocationInput)
], GameStatusInput.prototype, "location", void 0);
GameStatusInput = __decorate([
    type_graphql_1.InputType()
], GameStatusInput);
let NewProfileInput = class NewProfileInput {
};
__decorate([
    type_graphql_1.Field(type => PersonalInput),
    __metadata("design:type", PersonalInput)
], NewProfileInput.prototype, "personal", void 0);
__decorate([
    type_graphql_1.Field(type => GameStatusInput, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", GameStatusInput)
], NewProfileInput.prototype, "gameStatus", void 0);
NewProfileInput = __decorate([
    type_graphql_1.InputType()
], NewProfileInput);
exports.NewProfileInput = NewProfileInput;
//# sourceMappingURL=new-profile.input.js.map