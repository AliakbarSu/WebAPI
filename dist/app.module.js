"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const index_module_1 = require("./challengeRequests/index.module");
const graphql_1 = require("@nestjs/graphql");
const profile_module_1 = require("./profile/profile.module");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./auth/auth.module");
const questions_module_1 = require("./questions/questions.module");
const gqlFieldAuthChecker_1 = require("./auth/gqlFieldAuthChecker");
const points_module_1 = require("./points/points.module");
const game_module_1 = require("./game/game.module");
const apollo_server_express_1 = require("apollo-server-express");
require('dotenv').config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            profile_module_1.ProfileModule,
            index_module_1.ChallengeRequestsModule,
            graphql_1.GraphQLModule.forRoot({
                installSubscriptionHandlers: true,
                autoSchemaFile: 'schema.gql',
                context: ({ req, connection }) => {
                    return connection
                        ? { req: { headers: connection.context.headers } }
                        : { req };
                },
                buildSchemaOptions: {
                    authChecker: gqlFieldAuthChecker_1.gqlFieldAuthChecker,
                    authMode: 'null'
                }
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URL),
            auth_module_1.AuthModule,
            questions_module_1.QuestionsModule,
            points_module_1.PointsModule,
            game_module_1.GameModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: 'PUB_SUB',
                useValue: new apollo_server_express_1.PubSub()
            },
            app_service_1.AppService
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map