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
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], InputRequest.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], InputRequest.prototype, "opponent", void 0);
__decorate([
    type_graphql_1.Field(type => Number, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], InputRequest.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(type => Number, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], InputRequest.prototype, "updated_at", void 0);
InputRequest = __decorate([
    type_graphql_1.InputType()
], InputRequest);
let GameStatusType = class GameStatusType {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], GameStatusType.prototype, "level", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
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
    type_graphql_1.Field({ nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateProfileInput.prototype, "email", void 0);
UpdateProfileInput = __decorate([
    type_graphql_1.InputType()
], UpdateProfileInput);
exports.UpdateProfileInput = UpdateProfileInput;
//# sourceMappingURL=update-profile.input.js.map