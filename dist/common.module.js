"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommonModule_1;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile/profile.service");
const profile_schema_1 = require("./profile/MongoSchema/profile.schema");
const mongoose_1 = require("@nestjs/mongoose");
let CommonModule = CommonModule_1 = class CommonModule {
};
CommonModule = CommonModule_1 = __decorate([
    common_1.Module({
        imports: [
            CommonModule_1,
            mongoose_1.MongooseModule.forFeature([{ name: 'Profile', schema: profile_schema_1.ProfileSchema }]),
        ],
        providers: [profile_service_1.ProfileService],
        exports: [profile_service_1.ProfileService],
    })
], CommonModule);
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map