import { Strategy } from 'passport-jwt';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/models/profile';
declare const JwtStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly profileService;
    constructor(profileService: ProfileService);
    validate(payload: any): Promise<Profile>;
}
export {};
