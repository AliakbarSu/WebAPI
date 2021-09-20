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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
let RolesAuthGuard = class RolesAuthGuard extends passport_1.AuthGuard('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
        this.context = null;
    }
    getRequest(context) {
        try {
            this.context = context;
            if (context.switchToWs().getClient() !== undefined) {
                const request = context.switchToHttp().getRequest();
                request.headers = { authorization: `Bearer ${context.switchToWs().getData().token}` };
                return request;
            }
            else if (context.switchToHttp().getRequest() === undefined) {
                return graphql_1.GqlExecutionContext.create(context).getContext().req;
            }
            else {
                return context.switchToHttp().getRequest();
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    handleRequest(err, user, info) {
        try {
            if (err || !user) {
                throw err || new common_1.UnauthorizedException();
            }
            const roles = this.reflector.get('roles', this.context.getHandler());
            if (!roles) {
                return user;
            }
            const hasRole = () => user.privacy.roles.some((role) => roles.includes(role));
            if (!(user && user.privacy.roles && hasRole())) {
                throw new common_1.UnauthorizedException();
            }
            return user;
        }
        catch (err) {
            console.log(err);
        }
    }
};
RolesAuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesAuthGuard);
exports.RolesAuthGuard = RolesAuthGuard;
//# sourceMappingURL=rolesAuth.gaurd.js.map