import { InputType, Field } from 'type-graphql';
import { NewQuestionInput } from './newQuestion.input';

@InputType()
export class UpdateQuestionInput extends NewQuestionInput {
    @Field()
    id: string;
}
