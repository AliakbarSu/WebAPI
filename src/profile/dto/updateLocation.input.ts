import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType, ArgsType, Int } from 'type-graphql';


@InputType()
export class UpdateLocation  {
  @Field()
  id: string;
  @Field(type => [Number])
  coordinates: number[];
}
