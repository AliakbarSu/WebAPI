import { Model } from 'mongoose';
import { Questions } from '../interfaces/questions.interface';
import { UpdateQuestionInput } from '../dto/updateQuestion.input';
import { Question } from '../models/questions.model';
import { NewQuestionInput } from '../dto/newQuestion.input';
export declare class QuestionsService {
    private readonly questionModel;
    constructor(questionModel: Model<Questions>);
    create(data: NewQuestionInput): Promise<Question>;
    update(data: UpdateQuestionInput): Promise<Question>;
    remove(id: string): Promise<Question>;
    findOneById(id: string): Promise<Question>;
    findAll(): Promise<Question[]>;
    findByIds(ids: string[]): Promise<Question[]>;
    validateAnswers(questionIds: string[], answerIds: string[]): Promise<boolean[]>;
    generateQuestion(limit: number, diff_level: number, category: string): Promise<Question[]>;
    private _getCorrectAnswrId;
    private _covertAnswers;
}
