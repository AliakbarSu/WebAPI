import { Profile, Point } from './models/profile';
import { Model } from 'mongoose';
import { Profile as ProfileInterface } from './interfaces/profile.interface';
import { UpdateProfileInput } from './dto/update-profile.input';
import { AuthService } from '../auth/auth.service';
export declare class ProfileService {
    private readonly profileModel;
    private readonly authService;
    constructor(profileModel: Model<ProfileInterface>, authService: AuthService);
    create(username: string, email: string, password: string): Promise<Profile>;
    update(data: UpdateProfileInput): Promise<Profile>;
    updateGameStatus(data: UpdateProfileInput): Promise<Profile>;
    updateLocation(data: UpdateProfileInput): Promise<Profile[]>;
    findOneById(id: string): Promise<Profile>;
    findAll(conditions?: any): Promise<Profile[]>;
    findByEmail(email: string): Promise<Profile>;
    remove(id: string): Promise<Profile>;
    addPoints(points: Point[], id: string): Promise<Profile>;
    removePoints(points: number, id: string): Promise<Profile>;
}
