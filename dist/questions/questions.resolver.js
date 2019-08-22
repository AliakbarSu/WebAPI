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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const auth_guard_1 = require("../guards/auth.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const questions_model_1 = require("./models/questions.model");
const questions_service_1 = require("./questionsService/questions.service");
const newQuestion_input_1 = require("./dto/newQuestion.input");
const updateQuestion_input_1 = require("./dto/updateQuestion.input");
const pubSub = new apollo_server_express_1.PubSub();
let QuestionsResolver = class QuestionsResolver {
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    async getQuestion(id) {
        const question = await this.questionsService.findOneById(id);
        if (!question) {
            throw new common_1.NotFoundException(id);
        }
        return question;
    }
    async profiles() {
        return await this.questionsService.findAll();
    }
    answers() {
    }
    async addQuestion(newQuestion) {
        const question = await this.questionsService.create(newQuestion);
        return question;
    }
    async updateQuestion(data) {
        const question = await this.questionsService.update(data);
        return question;
    }
    async removeQuestion(id) {
        return this.questionsService.remove(id);
    }
};
__decorate([
    graphql_1.Query(returns => questions_model_1.Question, { name: 'question' }),
    roles_decorator_1.Roles('admin'),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsResolver.prototype, "getQuestion", null);
__decorate([
    graphql_1.Query(returns => [questions_model_1.Question]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionsResolver.prototype, "profiles", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], QuestionsResolver.prototype, "answers", null);
__decorate([
    graphql_1.Mutation(returns => questions_model_1.Question),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newQuestion_input_1.NewQuestionInput]),
    __metadata("design:returntype", Promise)
], QuestionsResolver.prototype, "addQuestion", null);
__decorate([
    graphql_1.Mutation(returns => questions_model_1.Question),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateQuestion_input_1.UpdateQuestionInput]),
    __metadata("design:returntype", Promise)
], QuestionsResolver.prototype, "updateQuestion", null);
__decorate([
    graphql_1.Mutation(returns => questions_model_1.Question),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsResolver.prototype, "removeQuestion", null);
QuestionsResolver = __decorate([
    graphql_1.Resolver(of => questions_model_1.Question),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsResolver);
exports.QuestionsResolver = QuestionsResolver;
//# sourceMappingURL=questions.resolver.js.map