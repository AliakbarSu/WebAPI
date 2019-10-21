import { Field, ID, ObjectType} from 'type-graphql';
import { Answer } from '../../questions/models/questions.model';
import { Question } from '../../questions/models/questions.model';

@ObjectType()
export class Opponent {
  @Field()
  _id: string;
  @Field()
  username: string;
}

@ObjectType()
export class Game {
  @Field()
  _id: string;
  @Field(type => [GameQuestion])
  questions: GameQuestion[];
  @Field(type => [Opponent])
  opponents: Opponent[];
  @Field(type => String)
  createdAt: string;
  @Field()
  time: number;

}

@ObjectType()
export class ExpiredRequest {
  @Field()
  sender: string;
  @Field()
  status: boolean;
}

@ObjectType()
export class GameToken {
  @Field()
  token: string;
  @Field(type => [String])
  players: string[];
}

@ObjectType()
class GameQuestion {
  @Field(type => String)
  _id: string;
  @Field(type => String)
  id: string;
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
