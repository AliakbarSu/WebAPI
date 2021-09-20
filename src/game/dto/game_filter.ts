import { Max, Min, IsOptional } from 'class-validator';
import { ArgsType, Field, Int, InputType } from 'type-graphql';

@InputType()
export class GameFilter {
  @Field(type => String)
  _id: string;
  @Field(type => Int)
  level: number;
  @Field(type => Int)
  points: number;
}