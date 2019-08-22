import { InputType, Field } from 'type-graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class NewQuestionInput {
    @Field()
    question: string;
    @Field(type => [String])
    answers: string[];
    @Field()
    correctAnswer: string;
    @Field(type => Number)
    diff_level: number;
    @Field(type => String, {nullable: true})
    @IsOptional()
    category?: string;
}
