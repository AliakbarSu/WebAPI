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
let InputPersonal = class InputPersonal {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputPersonal.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputPersonal.prototype, "phone", void 0);
InputPersonal = __decorate([
    type_graphql_1.InputType()
], InputPersonal);
exports.InputPersonal = InputPersonal;
let InputPrivacy = class InputPrivacy {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputPrivacy.prototype, "password", void 0);
InputPrivacy = __decorate([
    type_graphql_1.InputType()
], InputPrivacy);
exports.InputPrivacy = InputPrivacy;
let InputLocation = class InputLocation {
};
InputLocation = __decorate([
    type_graphql_1.InputType()
], InputLocation);
exports.InputLocation = InputLocation;
let InputOnlineStatus = class InputOnlineStatus {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], InputOnlineStatus.prototype, "online", void 0);
InputOnlineStatus = __decorate([
    type_graphql_1.InputType()
], InputOnlineStatus);
exports.InputOnlineStatus = InputOnlineStatus;
let InputGameStatus = class InputGameStatus {
};
__decorate([
    type_graphql_1.Field(type => InputOnlineStatus),
    __metadata("design:type", InputOnlineStatus)
], InputGameStatus.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(type => InputLocation),
    __metadata("design:type", Object)
], InputGameStatus.prototype, "location", void 0);
InputGameStatus = __decorate([
    type_graphql_1.InputType()
], InputGameStatus);
exports.InputGameStatus = InputGameStatus;
let InputPayment = class InputPayment {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputPayment.prototype, "bankAccountName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputPayment.prototype, "bankAccountNumber", void 0);
InputPayment = __decorate([
    type_graphql_1.InputType()
], InputPayment);
exports.InputPayment = InputPayment;
let InputUpdateProfile = class InputUpdateProfile {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], InputUpdateProfile.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => InputPersonal),
    __metadata("design:type", Object)
], InputUpdateProfile.prototype, "personal", void 0);
__decorate([
    type_graphql_1.Field(type => InputPrivacy),
    __metadata("design:type", Object)
], InputUpdateProfile.prototype, "privacy", void 0);
__decorate([
    type_graphql_1.Field(type => InputGameStatus),
    __metadata("design:type", InputGameStatus)
], InputUpdateProfile.prototype, "gameStatus", void 0);
__decorate([
    type_graphql_1.Field(type => InputPayment),
    __metadata("design:type", Object)
], InputUpdateProfile.prototype, "payment", void 0);
InputUpdateProfile = __decorate([
    type_graphql_1.InputType()
], InputUpdateProfile);
exports.InputUpdateProfile = InputUpdateProfile;
//# sourceMappingURL=profile.update.js.map