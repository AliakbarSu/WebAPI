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
const websockets_1 = require("@nestjs/websockets");
let ChallengeRequestsGateway = class ChallengeRequestsGateway {
    findNearest(client, data) {
        const random = Math.random();
        if (random > 0.6) {
            return {
                points: 33,
                level: 2,
                opponent: {
                    name: 'John',
                    avatar: {
                        uri: "https://res.cloudinary.com/dxuf2ssx6/image/upload/v1560931309/restaurant/backgrounds/joseph-gonzalez-176749-unsplash.jpg"
                    },
                    win: 22,
                    lost: 12,
                    level: 5,
                },
                time: 3,
                status: 'Pending',
            };
        }
        return null;
    }
    async identity(client, data) {
        return 'from server 3';
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ChallengeRequestsGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('locationChanged'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ChallengeRequestsGateway.prototype, "findNearest", null);
__decorate([
    websockets_1.SubscribeMessage('identity'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ChallengeRequestsGateway.prototype, "identity", null);
ChallengeRequestsGateway = __decorate([
    websockets_1.WebSocketGateway({ path: '/challenge' })
], ChallengeRequestsGateway);
exports.ChallengeRequestsGateway = ChallengeRequestsGateway;
//# sourceMappingURL=index.gateway.js.map