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
const class_validator_1 = require("class-validator");
let NewQuestionInput = class NewQuestionInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewQuestionInput.prototype, "question", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], NewQuestionInput.prototype, "answers", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], NewQuestionInput.prototype, "correctAnswer", void 0);
__decorate([
    type_graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], NewQuestionInput.prototype, "diff_level", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], NewQuestionInput.prototype, "category", void 0);
NewQuestionInput = __decorate([
    type_graphql_1.InputType()
], NewQuestionInput);
exports.NewQuestionInput = NewQuestionInput;
//# sourceMappingURL=newQuestion.input.js.map