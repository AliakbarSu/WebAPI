import { Max, Min, IsOptional } from 'class-validator';
import { ArgsType, Field, Int, InputType } from 'type-graphql';

@InputType()
export class UpdateLocation {
  @Field(type => String)
  _id: string;
  @Field(type => String)
  type: string;

  @Field(type => [Number])
  coordinates: number[];
}
