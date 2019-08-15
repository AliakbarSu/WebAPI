import { NewProfileInput } from './dto/new-profile.input';
import { Profile } from './models/profile';
import { Model } from 'mongoose';
import { Profile as ProfileInterface } from './interfaces/profile.interface';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UpdateLocationInput } from './dto/update-location.input';
export declare class ProfileService {
    private readonly profileModel;
    constructor(profileModel: Model<ProfileInterface>);
    create(data: NewProfileInput): Promise<Profile>;
    update(data: UpdateProfileInput): Promise<Profile>;
    updateLocation(id: string, location: UpdateLocationInput): Promise<Profile>;
    findOneById(id: string): Promise<Profile>;
    findAll(): Promise<Profile[]>;
    remove(id: string): Promise<boolean>;
}
