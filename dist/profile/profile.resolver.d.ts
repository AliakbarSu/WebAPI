import { NewProfileInput } from './dto/new-profile.input';
import { Profile, Privacy } from './models/profile';
import { ProfileService } from './profile.service';
import { ResolverInterface } from 'type-graphql';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UpdateLocationInput } from './dto/update-location.input';
export declare class ProfileResolver implements ResolverInterface<Profile> {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(id: string): Promise<Profile>;
    profiles(): Promise<Profile[]>;
    privacy(): Privacy;
    addProfile(newProfileData: NewProfileInput): Promise<Profile>;
    updateProfile(data: UpdateProfileInput): Promise<Profile>;
    updateLocation(id: string, location: UpdateLocationInput): Promise<Profile>;
    removeProfile(id: string): Promise<boolean>;
    recipeAdded(): AsyncIterator<{}>;
}