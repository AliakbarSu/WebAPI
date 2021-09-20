"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const game_service_1 = require("./game.service");
const game_resolver_1 = require("./game.resolver");
const common_module_1 = require("../common.module");
const profile_module_1 = require("../profile/profile.module");
const questions_module_1 = require("../questions/questions.module");
const mongoose_1 = require("@nestjs/mongoose");
const game_schema_1 = require("./MongoSchema/game.schema");
const points_service_1 = require("../points/points.service");
let GameModule = class GameModule {
};
GameModule = __decorate([
    common_1.Module({
        providers: [game_service_1.GameService, game_resolver_1.GameResolver, points_service_1.PointsService],
        imports: [
            questions_module_1.QuestionsModule,
            profile_module_1.ProfileModule,
            common_module_1.CommonModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'Game', schema: game_schema_1.GameSchema }]),
        ],
    })
], GameModule);
exports.GameModule = GameModule;
//# sourceMappingURL=game.module.js.map