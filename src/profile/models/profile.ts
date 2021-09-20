import { Field, ID, ObjectType, Int, Authorized } from 'type-graphql';

@ObjectType()
export class Personal {
  @Field({nullable: true})
  firstName?: string;
  @Field({nullable: true})
  lastName?: string;
  @Field()
  avatar: string;
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  phone: string;
  @Field()
  notificationEmail: string;
  @Field()
  country: string;
}

@ObjectType()
export class Payment {
  @Field()
  bankAccountName: string;
  @Field()
  bankAccountNumber: string;
  stripeCustomerId: string;
}

@ObjectType()
export class Privacy {
  @Field()
  password: string;
  @Field()
  resetPasswordToken: string;
  @Field()
  loginFailedAttempts: number;
  @Field(type => [String])
  roles: string[];
}

@ObjectType()
export class Location {
  @Field(type => String)
  type: string;
  @Field(type => [Number])
  coordinates: number[];
}

@ObjectType()
export class OnlineStatus {
  @Field()
  online: number;
  @Field(type => String)
  lastOnline: string;
  @Field()
  lastLoggedIn: string;
  @Field()
  onlineTime: number;
}

@ObjectType()
export class GameStatus {
  @Field()
  win: number;
  @Field()
  lost: number;
  @Field(type => OnlineStatus)
  status: OnlineStatus;
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
export class Point {
  @Field()
  amount: number;
  sendable: boolean;
  createdAt: number;
}

@ObjectType()
export class Points {
  @Field(type => [Point])
  points: Point[];
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
  @Field(type => Payment)
  payment: Payment;
  @Field(type => Points)
  points: Points;
  // @Authorized('owner')
  @Field(type => GameStatus)
  gameStatus: GameStatus;
}

