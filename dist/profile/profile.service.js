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
let ProfileService = class ProfileService {
    constructor(profileModel) {
        this.profileModel = profileModel;
    }
    async create(data) {
        const createdProfile = new this.profileModel(data);
        return await createdProfile.save();
    }
    async update(data) {
        const updatedProfile = this.profileModel.findOneAndUpdate({ _id: data._id }, flat_1.default(Object.assign({}, data)), { new: true });
        return await updatedProfile.exec();
    }
    async updateLocation(id, location) {
        await this.update({ _id: id, gameStatus: { location } });
        const fetchedLocation = this.profileModel.find({
            $and: [
                { 'gameStatus.location': {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: location.coordinates,
                            },
                            $maxDistance: 20,
                        },
                    },
                }
            ],
        });
        return fetchedLocation;
    }
    async findOneById(id) {
        return await this.profileModel.findById(id);
    }
    async findAll() {
        return [profileDummyData];
    }
    async remove(id) {
        const removedProfile = this.profileModel.findOneAndDelete({ _id: id });
        return removedProfile;
    }
};
ProfileService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Profile')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], ProfileService);
exports.ProfileService = ProfileService;
const profileDummyData = {
    _id: 'jfkl;sjfsfj',
    personal: {
        firstName: 'asfjksfj',
        lastName: 'fjksafj',
        username: 'fjklsafjs;f',
        phone: '93993838',
        email: 'fjklas;fjsfjkf',
    },
    points: {
        points: 22,
        recievedPoints: {
            id: 'fjsafjskfj',
            sender: 'jfaksfjsf',
            amount: 22,
            timestamp: new Date(),
        },
        sentPoints: {
            id: 'fjsafjskfj',
            recipient: 'jfaksfjsf',
            amount: 22,
            timestamp: new Date(),
        },
        redeemedPoints: 222,
    },
    gameStatus: {
        status: 1,
        win: 0,
        lost: 0,
        level: 1,
    },
};
//# sourceMappingURL=profile.service.js.map