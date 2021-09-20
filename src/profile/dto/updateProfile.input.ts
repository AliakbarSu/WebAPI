import { IsOptional, Length, MaxLength, IsString, MinLength, IsEmail, IsMobilePhone} from 'class-validator';
import { Field, InputType, ArgsType, Int } from 'type-graphql';


@InputType()
export class UpdateProfile  {
  @Field()
  id: string;
  @Field(type => String, {nullable: true})
  @IsOptional()
  @IsEmail()
  notificationEmail?: string;
  @Field(type => String, {nullable: true})
  @IsOptional()
  @IsMobilePhone(null)
  phoneNumber?: string;
  @Field(type => String, {nullable: true})
  @IsOptional()
  @IsString()
  country?: string;
  @Field(type => String, {nullable: true})
  @IsOptional()
  @IsString()
  bankAccountName?: string;
  @Field(type => String, {nullable: true})
  @IsOptional()
  @IsString()
  bankAccountNumber?: string;
}
