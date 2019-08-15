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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_server_express_1 = require("apollo-server-express");
const new_profile_input_1 = require("./dto/new-profile.input");
const profile_1 = require("./models/profile");
const profile_service_1 = require("./profile.service");
const type_graphql_1 = require("type-graphql");
const update_profile_input_1 = require("./dto/update-profile.input");
const update_location_input_1 = require("./dto/update-location.input");
const pubSub = new apollo_server_express_1.PubSub();
let ProfileResolver = class ProfileResolver {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getProfile(id) {
        const profile = await this.profileService.findOneById(id);
        if (!profile) {
            throw new common_1.NotFoundException(id);
        }
        return profile;
    }
    profiles() {
        return this.profileService.findAll();
    }
    privacy() {
        return {
            password: 'fkafjskl;fj',
            resetPasswordToken: 'jfl;akjfklsjf424',
            loginFailedAttempts: 2,
        };
    }
    async addProfile(newProfileData) {
        const profile = await this.profileService.create(newProfileData);
        return profile;
    }
    async updateProfile(data) {
        const profile = await this.profileService.update(data);
        return profile;
    }
    async updateLocation(id, location) {
        const foundLocations = await this.profileService.updateLocation(id, location);
        if (!foundLocations) {
            throw new common_1.NotFoundException(id);
        }
        return foundLocations;
    }
    async removeProfile(id) {
        return this.profileService.remove(id);
    }
    recipeAdded() {
        return pubSub.asyncIterator('recipeAdded');
    }
};
__decorate([
    graphql_1.Query(returns => profile_1.Profile, { name: 'profile' }),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "getProfile", null);
__decorate([
    graphql_1.Query(returns => [profile_1.Profile]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "profiles", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", profile_1.Privacy)
], ProfileResolver.prototype, "privacy", null);
__decorate([
    graphql_1.Mutation(returns => profile_1.Profile),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_profile_input_1.NewProfileInput]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "addProfile", null);
__decorate([
    graphql_1.Mutation(returns => profile_1.Profile),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_profile_input_1.UpdateProfileInput]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "updateProfile", null);
__decorate([
    graphql_1.Mutation(returns => profile_1.Profile),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Args('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_location_input_1.UpdateLocationInput]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "updateLocation", null);
__decorate([
    graphql_1.Mutation(returns => profile_1.Profile),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "removeProfile", null);
__decorate([
    graphql_1.Subscription(returns => profile_1.Profile),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileResolver.prototype, "recipeAdded", null);
ProfileResolver = __decorate([
    graphql_1.Resolver(of => profile_1.Profile),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileResolver);
exports.ProfileResolver = ProfileResolver;
//# sourceMappingURL=profile.resolver.js.map