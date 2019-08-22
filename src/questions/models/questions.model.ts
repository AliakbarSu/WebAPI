import { Field, ID, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class Answer {
    @Field()
    id: string;
    @Field()
    text: string;
}

@ObjectType()
export class Question {
  @Field(type => ID)
  _id: string;
  @Field()
  question: string;
  @Field(type => [Answer])
  answers: Answer[];
  @Field()
  correctAnswerId: string;
  @Field()
  diff_level: number;
  @Field()
  category: string;
  @Field()
  createdAt: number;
  @Field()
  updatedAt: number;
  @Field()
  createdBy: string;
}
