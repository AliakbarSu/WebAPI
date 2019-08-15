import { Field, ID, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class Personal {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  phone: string;
}

@ObjectType()
export class Privacy {
  @Field()
  password: string;

  @Field()
  resetPasswordToken: string;

  @Field()
  loginFailedAttempts: number;
}

@ObjectType()
export class Location {
  @Field(type => String)
  type: string;

  @Field(type => [Number])
  coordinates: number[];
}

@ObjectType()
export class GameStatus {
  @Field()
  win: number;

  @Field()
  lost: number;

  @Field()
  status: number;

  @Field()
  level: number;

  @Field(type => Location)
  location: Location;
}

@ObjectType()
export class RecievePoints {
  @Field()
  id: string;

  @Field()
  sender: string;

  @Field()
  amount: number;

  @Field()
  timestamp: Date;
}

@ObjectType()
export class SendPoints {
  @Field()
  id: string;

  @Field()
  recipient: string;

  @Field()
  amount: number;

  @Field()
  timestamp: Date;
}

@ObjectType()
export class Points {
  @Field()
  points: number;

  @Field()
  redeemedPoints: number;

  @Field()
  recievedPoints: RecievePoints;

  @Field()
  sentPoints: SendPoints;
}

@ObjectType()
export class Profile {
  @Field(type => ID)
  _id: string;

  @Field(type => Personal)
  personal: Personal;

  @Field(type => Privacy)
  privacy: Privacy;

  @Field(type => Points)
  points: Points;

  @Field(type => GameStatus)
  gameStatus: GameStatus;
}
