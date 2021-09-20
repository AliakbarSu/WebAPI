import { IsOptional, Length, MaxLength, IsString, MinLength, IsEmail, IsMobilePhone, IsNumber, Max, Min} from 'class-validator';
import { Field, InputType, ArgsType, Int } from 'type-graphql';


@InputType()
export class SendChallengeRequest  {
  @Field()
  id: string;
  @Field(type => String)
  @MaxLength(15)
  @MinLength(2)
  username: string;
  @Field(type => Number)
  @Max(10)
  @Min(1)
  level?: number;
  @Field(type => Number)
  @IsNumber()
  @Max(30)
  @Min(5)
  points: number;
}
