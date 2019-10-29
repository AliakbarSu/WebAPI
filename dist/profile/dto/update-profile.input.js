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
const update_location_input_1 = require("./update-location.input");
let InputRequest = class InputRequest {
};
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], InputRequest.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], InputRequest.prototype, "opponent", void 0);
__decorate([
    type_graphql_1.Field(type => Number, { nullable: true }),
    __metadata("design:type", Number)
], InputRequest.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(type => Number, { nullable: true }),
    __metadata("design:type", Number)
], InputRequest.prototype, "updated_at", void 0);
InputRequest = __decorate([
    type_graphql_1.InputType()
], InputRequest);
let OnlineStatusInput = class OnlineStatusInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], OnlineStatusInput.prototype, "online", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], OnlineStatusInput.prototype, "lastOnline", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], OnlineStatusInput.prototype, "lastLoggedIn", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], OnlineStatusInput.prototype, "onlineTime", void 0);
OnlineStatusInput = __decorate([
    type_graphql_1.InputType()
], OnlineStatusInput);
exports.OnlineStatusInput = OnlineStatusInput;
let GameStatusType = class GameStatusType {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], GameStatusType.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field(type => OnlineStatusInput, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", OnlineStatusInput)
], GameStatusType.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(type => update_location_input_1.UpdateLocationInput, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", update_location_input_1.UpdateLocationInput)
], GameStatusType.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(type => InputRequest, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", InputRequest)
], GameStatusType.prototype, "request", void 0);
GameStatusType = __decorate([
    type_graphql_1.InputType()
], GameStatusType);
let InputRecievePoints = class InputRecievePoints {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], InputRecievePoints.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], InputRecievePoints.prototype, "sender", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], InputRecievePoints.prototype, "amount", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], InputRecievePoints.prototype, "timestamp", void 0);
InputRecievePoints = __decorate([
    type_graphql_1.InputType()
], InputRecievePoints);
exports.InputRecievePoints = InputRecievePoints;
let InputSendPoints = class InputSendPoints {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], InputSendPoints.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], InputSendPoints.prototype, "recipient", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], InputSendPoints.prototype, "amount", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], InputSendPoints.prototype, "timestamp", void 0);
InputSendPoints = __decorate([
    type_graphql_1.InputType()
], InputSendPoints);
exports.InputSendPoints = InputSendPoints;
let InputPoint = class InputPoint {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], InputPoint.prototype, "amount", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], InputPoint.prototype, "sendable", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], InputPoint.prototype, "createdAt", void 0);
InputPoint = __decorate([
    type_graphql_1.InputType()
], InputPoint);
exports.InputPoint = InputPoint;
let InputPoints = class InputPoints {
};
__decorate([
    type_graphql_1.Field(type => [InputPoint]),
    __metadata("design:type", Array)
], InputPoints.prototype, "points", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], InputPoints.prototype, "redeemedPoints", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", InputRecievePoints)
], InputPoints.prototype, "recievedPoints", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", InputSendPoints)
], InputPoints.prototype, "sentPoints", void 0);
InputPoints = __decorate([
    type_graphql_1.InputType()
], InputPoints);
exports.InputPoints = InputPoints;
let UpdateProfileInput = class UpdateProfileInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.MaxLength(30),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(type => GameStatusType, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", GameStatusType)
], UpdateProfileInput.prototype, "gameStatus", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.MaxLength(30),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(type => InputPoints, { nullable: true }),
    __metadata("design:type", InputPoints)
], UpdateProfileInput.prototype, "points", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "email", void 0);
UpdateProfileInput = __decorate([
    type_graphql_1.InputType()
], UpdateProfileInput);
exports.UpdateProfileInput = UpdateProfileInput;
//# sourceMappingURL=update-profile.input.js.map