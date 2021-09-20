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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const flat_1 = __importDefault(require("flat"));
const question_class_1 = require("../customClass/question.class");
const mongoose_3 = __importDefault(require("mongoose"));
const uuid = require('uuid');
let QuestionsService = class QuestionsService {
    constructor(questionModel) {
        this.questionModel = questionModel;
    }
    create(data) {
        const updatedAnswer = this._covertAnswers(data.answers);
        const question = new question_class_1.Question(data.question, updatedAnswer, this._getCorrectAnswrId(updatedAnswer, data.correctAnswer).id, data.diff_level, 'ali', data.category);
        const createdProfile = new this.questionModel(question);
        return createdProfile.save();
    }
    update(data) {
        const updatedProfile = this.questionModel.findOneAndUpdate({ _id: data.id }, flat_1.default(Object.assign({}, data)), { new: true });
        return updatedProfile.exec();
    }
    remove(id) {
        const removedProfile = this.questionModel.findOneAndDelete({ _id: id });
        return removedProfile;
    }
    findOneById(id) {
        return this.questionModel.findById(id);
    }
    findAll() {
        return this.questionModel.find();
    }
    findByIds(ids) {
        return this.questionModel.find({
            '_id': { $in: ids.map(id => mongoose_3.default.Types.ObjectId(String(id))) },
        });
    }
    async validateAnswers(questionIds, answerIds) {
        const questions = await this.findByIds(questionIds);
        const results = questions.map(question => answerIds.includes(String(question.correctAnswerId)));
        return this._getScore(results);
    }
    _getScore(result) {
        return result.filter(v => v).length;
    }
    async generateQuestion(limit, diff_level, category) {
        return await this.questionModel.find({ diff_level, category }).limit(limit);
    }
    _getCorrectAnswrId(answers, correctAnswr) {
        return answers.find((answer) => answer.text.toLowerCase() === correctAnswr.toLowerCase());
    }
    _covertAnswers(answers) {
        return answers.map((answer) => {
            return {
                id: uuid(),
                text: answer,
            };
        });
    }
};
QuestionsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Question')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], QuestionsService);
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map