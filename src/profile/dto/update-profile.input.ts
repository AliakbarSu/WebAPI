import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType, ArgsType, Int } from 'type-graphql';
import { UpdateLocationInput } from './update-location.input';

@InputType()
class InputRequest {
  @Field(type => String, {nullable: true})
  status?: string;
  @Field(type => String, {nullable: true})
  opponent?: string;
  @Field(type => Number, {nullable: true})
  created_at?: number;
  @Field(type => Number, {nullable: true})
  updated_at?: number;
}

@InputType()
export class OnlineStatusInput {
  @Field({nullable: true})
  online?: number;
  @Field({nullable: true})
  lastOnline?: string;
  @Field({nullable: true})
  lastLoggedIn?: string;
  @Field({nullable: true})
  onlineTime?: number;
}

@InputType()
class GameStatusType {
    @Field({nullable: true})
    @IsOptional()
    level?: number;

    @Field(type => OnlineStatusInput, {nullable: true})
    @IsOptional()
    status?: OnlineStatusInput;

    @Field(type => UpdateLocationInput, {nullable: true})
    @IsOptional()
    location?: UpdateLocationInput;

    @Field(type => InputRequest, {nullable: true})
    @IsOptional()
    request?: InputRequest;
}

@InputType()
export class InputRecievePoints {
  @Field({nullable: true})
  id: string;
  @Field({nullable: true})
  sender?: string;
  @Field({nullable: true})
  amount?: number;
  @Field({nullable: true})
  timestamp?: Date;
}

@InputType()
export class InputSendPoints {
  @Field({nullable: true})
  id?: string;
  @Field({nullable: true})
  recipient?: string;
  @Field({nullable: true})
  amount?: number;
  @Field({nullable: true})
  timestamp?: Date;
}

@InputType()
export class InputPoint {
  @Field({nullable: true})
  amount?: number;
  @Field({nullable: true})
  sendable?: boolean;
  @Field({nullable: true})
  createdAt?: number;
}

@InputType()
export class InputPoints {
  @Field(type => [InputPoint])
  points?: InputPoint[];
  @Field({nullable: true})
  redeemedPoints?: number;
  @Field({nullable: true})
  recievedPoints?: InputRecievePoints;
  @Field({nullable: true})
  sentPoints?: InputSendPoints;
}

@InputType()
export class UpdateProfileInput  {
  @Field()
  _id: string;

  @Field({ nullable: true })
  @MaxLength(30)
  @IsOptional()
  firstName?: string;

  @Field(type => GameStatusType, { nullable: true })
  @IsOptional()
  gameStatus?: GameStatusType;

  @Field({ nullable: true })
  @MaxLength(30)
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  password?: string;

  @Field(type => InputPoints, {nullable: true})
  points?: InputPoints;

  @Field({ nullable: true })
  @IsOptional()
  email?: string;
}
