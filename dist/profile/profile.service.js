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
var _a;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const flat_1 = __importDefault(require("flat"));
const auth_service_1 = require("../auth/auth.service");
let ProfileService = class ProfileService {
    constructor(profileModel, authService) {
        this.profileModel = profileModel;
        this.authService = authService;
    }
    async create(username, email, password) {
        const createdProfile = new this.profileModel({
            'personal.username': username,
            'personal.email': email,
            'privacy.password': await this.authService.hashPassword(password),
        });
        return await createdProfile.save();
    }
    async update(data) {
        const updatedProfile = this.profileModel.findOneAndUpdate({ _id: data._id }, flat_1.default(Object.assign({}, data)), { new: true });
        return await updatedProfile.exec();
    }
    async updateGameStatus(data) {
        const updatedProfile = this.profileModel.findOneAndUpdate({ _id: data._id }, Object.assign({}, data));
        return await updatedProfile.exec();
    }
    async updateLocation(data) {
        const updatedProfile = await this.update(Object.assign({}, data, { gameStatus: { location: data.gameStatus.location, status: { online: 1 } } }));
        const fetchedLocation = this.profileModel.find({
            $and: [
                { 'gameStatus.level': updatedProfile.gameStatus.level },
                { 'gameStatus.status.online': 1 },
                { 'gameStatus.location': {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: data.gameStatus.location.coordinates,
                            },
                            $maxDistance: 200,
                        },
                    },
                }
            ],
        });
        return fetchedLocation;
    }
    async findOneById(id) {
        return await this.profileModel.findOne({ '_id': id });
    }
    async findAll(conditions) {
        return await this.profileModel.find(conditions);
    }
    async findByEmail(email) {
        return await this.profileModel.findOne({ 'personal.email': email });
    }
    async remove(id) {
        const removedProfile = this.profileModel.findOneAndDelete({ _id: id });
        return removedProfile;
    }
    async addPoints(points, id) {
        return this.profileModel.updateOne({ _id: id }, { $push: { 'points.points': { $each: points } } }, { upsert: true });
    }
    async removePoints(points, id) {
        return;
        return this.profileModel.update({ _id: id }, { $pull: { 'points.points': { amount: 1 } } }, { limit: points });
    }
};
ProfileService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Profile')),
    __param(1, common_1.Inject(common_1.forwardRef(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, auth_service_1.AuthService])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map