import { Max, Min, IsOptional } from 'class-validator';
import { ArgsType, Field, Int, InputType } from 'type-graphql';
import { Location } from '../models/profile';

@InputType()
export class UpdateLocationInput implements Location {
  @Field(type => String)
  type: string;

  @Field(type => [Number])
  coordinates: number[];
}
