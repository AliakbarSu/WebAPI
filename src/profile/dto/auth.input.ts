import { InputType, Field } from 'type-graphql';

@InputType()
export class CredentialsInputs {
 @Field(type => String)
 email: string;

 @Field(type => String)
 password: string;
}
