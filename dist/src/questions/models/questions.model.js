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
let Answer = class Answer {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Answer.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Answer.prototype, "text", void 0);
Answer = __decorate([
    type_graphql_1.ObjectType()
], Answer);
exports.Answer = Answer;
let Question = class Question {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", String)
], Question.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Question.prototype, "question", void 0);
__decorate([
    type_graphql_1.Field(type => [Answer]),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Question.prototype, "correctAnswerId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Question.prototype, "diff_level", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Question.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Question.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Question.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Question.prototype, "createdBy", void 0);
Question = __decorate([
    type_graphql_1.ObjectType()
], Question);
exports.Question = Question;
//# sourceMappingURL=questions.model.js.map