"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const profile_service_1 = require("../profile/profile.service");
const SECRET_KEY = 'testing';
const SALT_ROUNDS = 2;
let AuthService = class AuthService {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async authenticate(credentials) {
        try {
            const fetchedUser = await this.profileService.findByEmail(credentials.email);
            if (!fetchedUser) {
                return false;
            }
            if (!this._verifyPassword(fetchedUser.privacy.password, credentials.password)) {
                return false;
            }
            return {
                profile: fetchedUser,
                token: this._generateToken(fetchedUser),
            };
        }
        catch (err) {
            return false;
        }
    }
    isAuthenticated(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            if (!decoded) {
                return false;
            }
            return decoded.payload;
        }
        catch (err) {
            return false;
        }
    }
    isAuthorized(token, roles) {
        const updatedToken = this.isAuthenticated(token);
        if (updatedToken) {
            let isAllowed = true;
            roles.forEach((role) => {
                if (!updatedToken.roles.includes(role)) {
                    isAllowed = false;
                }
            });
            return isAllowed;
        }
        return false;
    }
    _verifyPassword(hash, password) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.compare(password, hash, (err, res) => {
                if (err) {
                    return reject(false);
                }
                resolve(true);
            });
        });
    }
    _generateToken(profile) {
        const data = JSON.stringify({ roles: profile.privacy.roles, id: profile._id });
        return jsonwebtoken_1.default.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), data }, SECRET_KEY);
    }
    hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.hash(password, SALT_ROUNDS, (err, hash) => {
                if (err) {
                    return reject(false);
                }
                resolve(hash);
            });
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.forwardRef(() => profile_service_1.ProfileService))),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map