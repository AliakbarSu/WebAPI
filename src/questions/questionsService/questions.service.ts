import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Questions } from '../interfaces/questions.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateQuestionInput } from '../dto/updateQuestion.input';
import flatten from 'flat';
import { Question, Answer } from '../models/questions.model';
import { NewQuestionInput } from '../dto/newQuestion.input';
import {Question as QuestionObj} from '../customClass/question.class';
import mongoose from 'mongoose';
const uuid = require('uuid');

@Injectable()
export class QuestionsService {
    constructor(@InjectModel('Question') private readonly questionModel: Model<Questions>) {}

    create(data: NewQuestionInput): Promise<Question> {
        const updatedAnswer = this._covertAnswers(data.answers);
        const question: QuestionObj = new QuestionObj(
            data.question,
            updatedAnswer,
            this._getCorrectAnswrId(updatedAnswer, data.correctAnswer).id,
            data.diff_level,
            'ali',
            data.category,
        );
        const createdProfile = new this.questionModel(question);
        return createdProfile.save();
    }

    update(data: UpdateQuestionInput): Promise<Question> {
        const updatedProfile = this.questionModel.findOneAndUpdate({_id: data.id},
            flatten({...data}), {new: true});
        return updatedProfile.exec();
    }

    remove(id: string): Promise<Question> {
        const removedProfile = this.questionModel.findOneAndDelete({_id: id});
        return removedProfile;
    }

    findOneById(id: string): Promise<Question> {
        return this.questionModel.findById(id);
    }

    findAll(): Promise<Question[]> {
        return this.questionModel.find();
    }

    findByIds(ids: string[]): Promise<Question[]> {
        return this.questionModel.find({
            '_id': { $in: ids.map(id => mongoose.Types.ObjectId(String(id)))},
        });
    }

    async validateAnswers(questionIds: string[], answerIds: string[]): Promise<number> {
        const questions: Question[] = await this.findByIds(questionIds);
        const results = questions.map(question => answerIds.includes(String(question.correctAnswerId)));
        return this._getScore(results);
    }

    private _getScore(result: boolean[]): number {
        return result.filter(v => v).length;
    }

    async generateQuestion(limit: number, diff_level: number, category: string): Promise<Question[]> {
        return await this.questionModel.find({diff_level, category}).limit(limit);
    }

    private _getCorrectAnswrId(answers: Answer[], correctAnswr: string): Answer | undefined {
        return answers.find((answer: Answer) => answer.text.toLowerCase() === correctAnswr.toLowerCase());
    }

    private _covertAnswers(answers: string[]): Answer[] {
        return answers.map((answer: string) => {
            return {
                id: uuid(),
                text: answer,
            };
        });
    }
}
