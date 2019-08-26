import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AuthChecker } from 'type-graphql';
import jwt, { JwtHeader } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/models/profile';
import { JwtService } from '@nestjs/jwt';

const SECRET_KEY = 'testing';
const SALT_ROUNDS = 2;

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

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => ProfileService))
        private readonly profileService: ProfileService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<Profile | null> {
        try {
            const fetchedUser = await this.profileService.findByEmail(email);
            if (!fetchedUser) { return null; }
            if (!this._verifyPassword(fetchedUser.privacy.password, pass)) {
                return null;
            }

            return fetchedUser;

        } catch (err) {
            return null;
        }
    }

    async login(user: any) {
        const payload = { username: user.personal.username, sub: user._id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

    isAuthenticated(token: string): Token | false {
        try {
            const decoded: any = jwt.verify(token, SECRET_KEY);
            if (!decoded) {
                return false;
            }
            return decoded.payload;
        } catch (err) {
            return false;
        }
    }

    isAuthorized(token: string, roles: string[]): boolean {
        const updatedToken: Token | boolean = this.isAuthenticated(token);
        if (updatedToken) {
            let isAllowed: boolean = true;
            roles.forEach((role: string) => {
                if (!updatedToken.roles.includes(role)) {
                    isAllowed = false;
                }
            });
            return isAllowed;
        }
        return false;
    }

    private _verifyPassword(hash: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, res) => {
                if (err) {
                    return reject(false);
                }
                resolve(true);
            });
        });
    }

    private _generateToken(profile: Profile): string {
        const data = JSON.stringify({roles: profile.privacy.roles, id: profile._id});
        return jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), data }, SECRET_KEY);
    }

    public hashPassword(password): Promise<string | false> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                if (err) {
                    return reject(false);
                }
                resolve(hash);
            });
        });
    }

}

// export const customeAuthChecker: AuthChecker<any> = ({root, args, context, info}, roles) => {
//     return true;
// };
