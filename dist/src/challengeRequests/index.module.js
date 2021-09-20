"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const index_gateway_1 = require("./index.gateway");
const room_service_1 = require("./room.service");
const questions_module_1 = require("../questions/questions.module");
const profile_module_1 = require("../profile/profile.module");
let ChallengeRequestsModule = class ChallengeRequestsModule {
};
ChallengeRequestsModule = __decorate([
    common_1.Module({
        imports: [profile_module_1.ProfileModule, questions_module_1.QuestionsModule],
        providers: [room_service_1.RoomService, index_gateway_1.ChallengeRequestsGateway],
    })
], ChallengeRequestsModule);
exports.ChallengeRequestsModule = ChallengeRequestsModule;
//# sourceMappingURL=index.module.js.map