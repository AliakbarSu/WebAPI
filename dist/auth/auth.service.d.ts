import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/models/profile';
import { JwtService } from '@nestjs/jwt';
export interface Token {
    id: string;
    roles: string[];
}
export interface Credentials {
    email: string;
    password: string;
}
export interface Auth {
    profile: Profile;
    token: string;
}
export declare class AuthService {
    private readonly profileService;
    private readonly jwtService;
    constructor(profileService: ProfileService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<Profile | null>;
    login(user: any): Promise<{
        id: any;
        access_token: string;
    }>;
    isAuthenticated(token: string): Token | false;
    isAuthorized(token: string, roles: string[]): boolean;
    private _verifyPassword;
    private _generateToken;
    hashPassword(password: any): Promise<string | false>;
}
