import { Field, ID, ObjectType} from 'type-graphql';
import { Opponent } from './game.model';
import { Profile } from '../../profile/models/profile';

@ObjectType()
export class Request {
  @Field()
  _id: string;
  @Field(type => Number)
  points: number;
  @Field(type => Profile)
  sender: Profile;
  @Field(type => Number)
  level: number;
  @Field(type => Profile)
  opponents: Profile;
  @Field(type => String)
  token: string;
  @Field(type => Number)
  time: number;
  @Field(type => String)
  createdAt: string;
}
