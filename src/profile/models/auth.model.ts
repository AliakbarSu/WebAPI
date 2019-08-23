import { ObjectType, Field } from 'type-graphql';
import { Profile } from './profile';

@ObjectType()
export class AuthModel {
    @Field(type => Profile)
    profile: Profile;
    @Field(type => String)
    token: string;
}
