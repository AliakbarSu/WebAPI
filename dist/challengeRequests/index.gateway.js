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
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ChallengeRequestsGateway = class ChallengeRequestsGateway {
    findAll(client, data) {
        return rxjs_1.from([1, 2, 3]).pipe(operators_1.map(item => ({ event: 'events', data: item })));
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
    websockets_1.SubscribeMessage('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ChallengeRequestsGateway.prototype, "findAll", null);
__decorate([
    websockets_1.SubscribeMessage('identity'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ChallengeRequestsGateway.prototype, "identity", null);
ChallengeRequestsGateway = __decorate([
    websockets_1.WebSocketGateway()
], ChallengeRequestsGateway);
exports.ChallengeRequestsGateway = ChallengeRequestsGateway;
//# sourceMappingURL=index.gateway.js.map