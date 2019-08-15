import { IsOptional, Length, MaxLength, MinLength } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { Profile, Personal, GameStatus, Location } from '../models/profile';

@InputType()
class PersonalInput implements Partial<Personal> {
  @Field()
  @MaxLength(30)
  @MinLength(1)
  firstName: string;

  @Field()
  @MaxLength(30)
  @MinLength(1)
  lastName: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}

@InputType()
class LocationInput implements Partial<Location> {
  @Field()
  type: string;

  @Field(type => [Number])
  coordinates: number[];
}

@InputType()
class GameStatusInput implements Partial<GameStatus> {
  @Field()
  level: number;

  @Field(type => LocationInput)
  location: LocationInput;
}

@InputType()
export class NewProfileInput {
 @Field(type => PersonalInput)
 personal: PersonalInput;

 @Field(type => GameStatusInput, {nullable: true})
 @IsOptional()
 gameStatus: GameStatusInput;
}
