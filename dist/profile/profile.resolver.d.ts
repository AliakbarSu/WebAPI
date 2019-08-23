import { NewProfileInput } from './dto/new-profile.input';
import { Profile, Privacy } from './models/profile';
import { ProfileService } from './profile.service';
import { ResolverInterface } from 'type-graphql';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Auth } from '../auth/auth.service';
import { CredentialsInputs } from './dto/auth.input';
export declare class ProfileResolver implements ResolverInterface<Profile> {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(id: string): Promise<Profile>;
    profiles(): Promise<Profile[]>;
    authenticate(credentials: CredentialsInputs): Promise<Auth | null>;
    privacy(): Privacy;
    addProfile(newProfileData: NewProfileInput): Promise<Profile>;
    updateProfile(data: UpdateProfileInput): Promise<Profile>;
    removeProfile(id: string): Promise<Profile>;
    updateAvatar(file: any, body: any): Promise<void>;
    recipeAdded(): AsyncIterator<{}>;
}
