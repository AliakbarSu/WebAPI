"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const questions_service_1 = require("./questionsService/questions.service");
const questions_schema_1 = require("./mongoSchema/questions.schema");
const mongoose_1 = require("@nestjs/mongoose");
const questions_resolver_1 = require("./questions.resolver");
let QuestionsModule = class QuestionsModule {
};
QuestionsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Question', schema: questions_schema_1.QuestionsSchema }]),
        ],
        providers: [
            questions_service_1.QuestionsService,
            questions_resolver_1.QuestionsResolver,
        ],
        exports: [questions_service_1.QuestionsService],
    })
], QuestionsModule);
exports.QuestionsModule = QuestionsModule;
//# sourceMappingURL=questions.module.js.map