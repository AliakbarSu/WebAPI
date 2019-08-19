import { IsOptional, Length, MaxLength } from 'class-validator';
import { Field, InputType, ArgsType, Int } from 'type-graphql';
import { UpdateLocationInput } from './update-location.input';


@InputType()
class Request {
  @Field(type => String, {nullable: true})
  @IsOptional()
  status?: string;
  @Field(type => String, {nullable: true})
  @IsOptional()
  opponent?: string;
  @Field(type => Number, {nullable: true})
  @IsOptional()
  created_at?: number;
  @Field(type => Number, {nullable: true})
  @IsOptional()
  updated_at?: number;
}



@InputType()
class GameStatusType {
    @Field({nullable: true})
    @IsOptional()
    level?: number;

    @Field({nullable: true})
    @IsOptional()
    status?: number;

    @Field(type => UpdateLocationInput, {nullable: true})
    @IsOptional()
    location?: UpdateLocationInput;

    @Field(type => Request, {nullable: true})
    @IsOptional()
    request?: Request;
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

  @Field({ nullable: true })
  @IsOptional()
  email?: string;
}


