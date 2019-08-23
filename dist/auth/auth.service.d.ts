import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/models/profile';
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
    constructor(profileService: ProfileService);
    authenticate(credentials: Credentials): Promise<Auth | false>;
    isAuthenticated(token: string): Token | false;
    isAuthorized(token: string, roles: string[]): boolean;
    private _verifyPassword;
    private _generateToken;
    hashPassword(password: any): Promise<string | false>;
}
