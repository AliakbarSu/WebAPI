import { ResolverInterface } from 'type-graphql';
import { Question } from './models/questions.model';
import { QuestionsService } from './questionsService/questions.service';
import { NewQuestionInput } from './dto/newQuestion.input';
import { UpdateQuestionInput } from './dto/updateQuestion.input';
export declare class QuestionsResolver implements ResolverInterface<Question> {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    getQuestion(id: string): Promise<Question>;
    questions(): Promise<Question[]>;
    answers(): any;
    addQuestion(newQuestion: NewQuestionInput): Promise<Question>;
    updateQuestion(data: UpdateQuestionInput): Promise<Question>;
    removeQuestion(id: string): Promise<Question>;
}
