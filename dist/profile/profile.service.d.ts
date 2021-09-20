import { Profile, Point } from './models/profile';
import { Model } from 'mongoose';
import { Profile as ProfileInterface } from './interfaces/profile.interface';
import { InputUpdateProfile } from './types/input/profile.update';
import { AuthService } from '../auth/auth.service';
import { UpdateLocation } from './dto/updateLocation.input';
export declare class ProfileService {
    private readonly profileModel;
    private readonly authService;
    constructor(profileModel: Model<ProfileInterface>, authService: AuthService);
    create(username: string, email: string, password: string): Promise<Profile>;
    update(data: any): Promise<Profile>;
    updateGameStatus(data: Pick<InputUpdateProfile, 'gameStatus' | '_id'>): Promise<Profile>;
    updateLocation(data: UpdateLocation): Promise<Profile[]>;
    findOneById(id: string): Promise<Profile>;
    findAll(conditions?: any, conditions2?: any): Promise<Profile[]>;
    findByEmail(email: string): Promise<Profile>;
    remove(id: string): Promise<Profile>;
    addPoints(points: Point[], id: string): Promise<Profile>;
    removePoints(points: number, id: string): Promise<Profile>;
}
