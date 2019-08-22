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
const profile_service_1 = require("../profile/profile.service");
const room_service_1 = require("./room.service");
const player_class_1 = require("./player.class");
const request_class_1 = require("./request.class");
const game_class_1 = require("./game.class");
const questions_service_1 = require("../questions/questionsService/questions.service");
let ChallengeRequestsGateway = class ChallengeRequestsGateway {
    constructor(profileService, roomService, questionsService) {
        this.profileService = profileService;
        this.roomService = roomService;
        this.questionsService = questionsService;
    }
    async findNearest(client, data) {
        const nearest = await this.profileService.updateLocation(data.userId, data.location);
        const nearestIds = nearest.map(profile => profile._id.toString());
        const request = new request_class_1.Request(new player_class_1.Player(data.userId, client.id), this.roomService.getReadyPlayers(nearestIds));
        this.roomService.addToRequests(request);
        request.eimit(this.server);
        return nearest;
    }
    handleConnection(server, data) {
        server.userId = server.handshake.query.token;
        const player = new player_class_1.Player(server.handshake.query.token, server.id);
        this.roomService.addToActive(player);
    }
    handleDisconnect(server) {
        const id = server.userId = server.handshake.query.token;
        this.roomService.removeFromActive(id);
    }
    async acceptRequest(client, data) {
        const request = this.roomService.requestRoom.find((r) => r.id === data.request);
        request.addToAccepted(data.userId);
        if (request && !request.isExpired && request.isReady()) {
            request.setState('ACTIVE');
            const game = new game_class_1.Game(this.questionsService, request);
            this.roomService.addToPlaying(game);
            this.roomService.removeFromRequests(request.id);
            game.start(this.server);
        }
        else {
            return 'Too late!';
        }
    }
    async submitAnswers(client, data) {
        const game = this.roomService.getActiveGame(data.gameId);
        if (game.state !== 'COMPLETED') {
            game.submitAnswers(data.userId, data.answers);
        }
        if (game.isGameOver) {
            game.announanceResults();
            game.finishGame();
            this.roomService.removeFromPlaying(game.id);
        }
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
    __metadata("design:returntype", Promise)
], ChallengeRequestsGateway.prototype, "findNearest", null);
__decorate([
    websockets_1.SubscribeMessage('onAcceptRequest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChallengeRequestsGateway.prototype, "acceptRequest", null);
__decorate([
    websockets_1.SubscribeMessage('onAnswersSubmitted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChallengeRequestsGateway.prototype, "submitAnswers", null);
ChallengeRequestsGateway = __decorate([
    websockets_1.WebSocketGateway({ path: '/challenge' }),
    __metadata("design:paramtypes", [profile_service_1.ProfileService,
        room_service_1.RoomService,
        questions_service_1.QuestionsService])
], ChallengeRequestsGateway);
exports.ChallengeRequestsGateway = ChallengeRequestsGateway;
//# sourceMappingURL=index.gateway.js.map