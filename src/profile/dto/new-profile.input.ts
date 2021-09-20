import { IsOptional, Length, MaxLength, MinLength } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { Profile, Personal, GameStatus, Location, Privacy } from '../models/profile';

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
class PrivacyInput implements Partial<Privacy> {
  @Field()
  password: string;
}

@InputType()
export class NewProfileInput {
 @Field(type => PersonalInput)
 personal: PersonalInput;

 @Field(type => GameStatusInput)
 gameStatus: GameStatusInput;

 @Field(type => PrivacyInput)
 privacy: Privacy;

}
