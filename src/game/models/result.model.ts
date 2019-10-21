import { Field, ID, ObjectType} from 'type-graphql';
import { Opponent } from './game.model';
import { Game } from './game.model';

@ObjectType()
export class Results {
  @Field()
  won: boolean;
  @Field(type => Number)
  points: number;
  @Field(type => String)
  winner: string;
}

@ObjectType()
export class PlaceHolderResult {
  @Field(type => Boolean)
  status: boolean;
}
