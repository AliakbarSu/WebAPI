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
const graphql_1 = require("@nestjs/graphql");
const apollo_server_express_1 = require("apollo-server-express");
const common_1 = require("@nestjs/common");
const profile_1 = require("../profile/models/profile");
const profile_service_1 = require("../profile/profile.service");
const game_model_1 = require("./models/game.model");
const questions_service_1 = require("../questions/questionsService/questions.service");
const request_model_1 = require("./models/request.model");
const result_model_1 = require("./models/result.model");
const game_filter_1 = require("./dto/game_filter");
const token_1 = require("./utils/token");
const game_util_1 = require("./utils/game.util");
const points_service_1 = require("../points/points.service");
const game_service_1 = require("./game.service");
const mongoose_1 = __importDefault(require("mongoose"));
const uuid = require('uuid/v1');
const moment_1 = __importDefault(require("moment"));
const updateLocation_input_1 = require("../profile/dto/updateLocation.input");
const sendChallengeRequest_1 = require("./dto/sendChallengeRequest");
let GameResolver = class GameResolver {
    constructor(pubSub, profileService, questionService, pointsService, gameService) {
        this.pubSub = pubSub;
        this.profileService = profileService;
        this.questionService = questionService;
        this.pointsService = pointsService;
        this.gameService = gameService;
        this.gameUtil = null;
        this.gameUtil = new game_util_1.GameUtil(this.questionService, this.pointsService);
        this.pubSub.subscribe('onActivityResponseReceived', async (message) => {
            const opponents = await this.profileService.findAll({ _id: message.onActivityResponseReceived.id });
            const sender = await this.profileService.findOneById(message.onActivityResponseReceived.sender);
            const updatedOpponents = opponents.filter(op => String(op._id) !== String(message.onActivityResponseReceived.sender));
            if (updatedOpponents.length) {
                this.pubSub.publish('onChallengeFound', { onChallengeFound: { _id: new mongoose_1.default.Types.ObjectId(), sender,
                        opponents: updatedOpponents,
                    } });
            }
        });
    }
    async updateLocation(data) {
        const opponents = await this.profileService.updateLocation(data);
        const sender = opponents.find(player => String(player._id) === String(data.id));
        if (opponents.length > 1) {
            this.pubSub.publish('onActivityResponse', { onActivityResponse: { _id: new mongoose_1.default.Types.ObjectId(), sender,
                    opponents: opponents.filter(op => String(op._id) !== String(data.id)),
                } });
        }
        return opponents;
    }
    async sendChallengeRequest(data) {
        const opponents = await this.profileService.findAll({
            'gameStatus.status.online': 1,
            'personal.username': data.username,
            'gameStatus.level': data.level,
        });
        const sender = await this.profileService.findOneById(data.id);
        if (opponents.length === 1) {
            this.pubSub.publish('onActivityResponse', { onActivityResponse: { _id: new mongoose_1.default.Types.ObjectId(), sender,
                    opponents: opponents.filter(op => String(op._id) !== String(data.id)),
                } });
        }
        return opponents;
    }
    async acceptRequest(id, token) {
        if (!token_1.Tokeniser.verify(token)) {
            this.pubSub.publish('onRequestExpired', { onRequestExpired: { sender: id, status: false } });
            return false;
        }
        const parsedToken = token_1.Tokeniser.parse(token);
        if (parsedToken.acceptedPlayers.length !== 2 || String(id) === String(parsedToken.sender._id)) {
            parsedToken.acceptedPlayers = [...parsedToken.acceptedPlayers, id];
            const players = [
                parsedToken.players[0],
                parsedToken.sender._id
            ];
            const gameToken = token_1.Tokeniser.tokenise(Object.assign({}, parsedToken, { acceptedPlayers: [...parsedToken.acceptedPlayers] }), true);
            this.pubSub.publish('onReceivingToken', { onReceivingToken: { token: gameToken, players } });
        }
        else {
            this.pubSub.publish('onRequestExpired', { onRequestExpired: { sender: id, status: false } });
        }
        if (parsedToken.acceptedPlayers.length === 2) {
            const game = await this.gameUtil.newGame(token);
            this.pubSub.publish('onGameStarted', { onGameStarted: Object.assign({}, game, { opponents: parsedToken.acceptedPlayers }) });
        }
        return true;
    }
    async rejectRequest(id, token) {
        let parsedToken = null;
        if (!token_1.Tokeniser.verify(token)) {
            this.pubSub.publish('onRequestExpired', { onRequestExpired: { sender: id, status: false } });
            return { status: false };
        }
        parsedToken = token_1.Tokeniser.parse(token);
        this.pubSub.publish('onRequestRejected', { onRequestRejected: { players: parsedToken.players } });
        return { status: true };
    }
    async updateActivity(id, sender) {
        const updatedProfile = await this.profileService.update({ _id: id, gameStatus: {
                status: {
                    lastOnline: moment_1.default().format()
                }
            } });
        this.pubSub.publish('onActivityResponseReceived', { onActivityResponseReceived: { id, sender } });
        return updatedProfile;
    }
    async SubmitAnswers(id, token, questionsIds, answerIds) {
        let newToken = null;
        let parsedToken = null;
        let score = null;
        if (!token_1.Tokeniser.verify(token)) {
            return { status: false };
        }
        parsedToken = token_1.Tokeniser.parse(token);
        score = await this.questionService.validateAnswers(questionsIds, answerIds);
        if (parsedToken.scores) {
            if (parsedToken.scores.map(s => String(s.playerId)).includes(String(id))) {
                return { status: true };
            }
            parsedToken.scores = [...parsedToken.scores, { playerId: id, score, submittedAt: new Date().getTime() }];
            newToken = token_1.Tokeniser.tokenise(parsedToken, true);
        }
        else {
            parsedToken.scores = [{ playerId: id, score, submittedAt: new Date().getTime() }];
            newToken = token_1.Tokeniser.tokenise(parsedToken, true);
        }
        const results = { token: newToken, scores: parsedToken.scores, players: parsedToken.acceptedPlayers, points: parsedToken.points };
        this.pubSub.publish('onReceivingToken', { onReceivingToken: results });
        if (parsedToken.scores.length === 2) {
            const playersResult = game_util_1.GameUtil.players(parsedToken.scores);
            const winner = await this.profileService.findOneById(playersResult.winner);
            const updatedWinner = await this.gameService.addPoints(1, playersResult.winner);
            const updatedLoser = await this.gameService.removePoints(1, playersResult.loser);
            try {
                const createdGame = await this.gameService.create({
                    _id: parsedToken.id,
                    players: parsedToken.acceptedPlayers,
                    winner: winner._id,
                    points: 122,
                });
            }
            catch (err) {
                console.log(err);
            }
            this.pubSub.publish('onGameEnds', { onGameEnds: Object.assign({}, results, { winner: winner.personal.username }) });
        }
        return { status: true };
    }
    async giveUp(id, token) {
        let parsedToken = null;
        if (!token_1.Tokeniser.verify(token)) {
            this.pubSub.publish('onRequestExpired', { onRequestExpired: { sender: id, status: false } });
            return { status: false };
        }
        parsedToken = token_1.Tokeniser.parse(token);
        const results = { scores: 0, players: parsedToken.players, points: parsedToken.points };
        const playersResult = game_util_1.GameUtil.players(parsedToken.scores);
        const winner = await this.profileService.findOneById(playersResult.winner);
        this.pubSub.publish('onGameEnds', { onGameEnds: Object.assign({}, results, { winner: winner.personal.username }) });
        return results;
    }
    onReceivingToken(id) {
        return this.pubSub.asyncIterator('onReceivingToken');
    }
    onActivityResponse(id) {
        return this.pubSub.asyncIterator('onActivityResponse');
    }
    onChallengeFound(filter) {
        return this.pubSub.asyncIterator('onChallengeFound');
    }
    onRequestAccepted() {
        return true;
    }
    onRequestRejected(id) {
        return this.pubSub.asyncIterator('onRequestRejected');
    }
    onRequestExpired(id) {
        return this.pubSub.asyncIterator('onRequestExpired');
    }
    onGameStarted(id, token) {
        return this.pubSub.asyncIterator('onGameStarted');
    }
    onGameEnds(id) {
        return this.pubSub.asyncIterator('onGameEnds');
    }
};
__decorate([
    graphql_1.Mutation(returns => [profile_1.Profile]),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateLocation_input_1.UpdateLocation]),
    __metadata("design:returntype", Promise)
], GameResolver.prototype, "updateLocation", null);
__decorate([
    graphql_1.Mutation(input => [profile_1.Profile]),
    __param(0, graphql_1.Args('data', new common_1.ValidationPipe({ skipMissingProperties: true, skipNullProperties: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sendChallengeRequest_1.SendChallengeRequest]),
    __metadata("design:returntype", Promise)
], GameResolver.prototype, "sendChallengeRequest", null);
__decorate([
    graphql_1.Mutation(returns => Boolean),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Args('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GameResolver.prototype, "acceptRequest", null);
__decorate([
    graphql_1.Mutation(returns => result_model_1.PlaceHolderResult),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Args('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GameResolver.prototype, "rejectRequest", null);
__decorate([
    graphql_1.Mutation(returns => profile_1.Profile),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Args('sender')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GameResolver.prototype, "updateActivity", null);
__decorate([
    graphql_1.Mutation(returns => result_model_1.PlaceHolderResult),
    __param(0, graphql_1.Args('_id')),
    __param(1, graphql_1.Args('token')),
    __param(2, graphql_1.Args({ name: 'questionIds', type: () => [String] })),
    __param(3, graphql_1.Args({ name: 'answerIds', type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, Array]),
    __metadata("design:returntype", Promise)
], GameResolver.prototype, "SubmitAnswers", null);
__decorate([
    graphql_1.Mutation(returns => result_model_1.Results),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Args('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GameResolver.prototype, "giveUp", null);
__decorate([
    graphql_1.Subscription(returns => game_model_1.GqlToken, {
        filter: (payload, variables) => {
            return payload.onReceivingToken.players.includes(String(variables.id));
        },
    }),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameResolver.prototype, "onReceivingToken", null);
__decorate([
    graphql_1.Subscription(returns => result_model_1.PlaceHolderResult, {
        filter: (payload, variables) => {
            return payload.onActivityResponse.opponents.map(p => String(p._id)).includes(String(variables.id))
                || String(variables.id) === String(payload.onActivityResponse.sender._id);
        },
        resolve: (value, variables) => {
            return {
                status: true,
                sender: value.onActivityResponse.sender._id
            };
        },
    }),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameResolver.prototype, "onActivityResponse", null);
__decorate([
    graphql_1.Subscription(returns => request_model_1.Request, {
        filter: (payload, variables) => {
            return payload.onChallengeFound.opponents.map(p => String(p._id)).includes(String(variables.filter._id))
                || String(variables.filter._id) === String(payload.onChallengeFound.sender._id);
        },
        resolve: (value, variables) => {
            const tokenData = {
                id: value.onChallengeFound._id,
                level: variables.filter.level,
                acceptedPlayers: [],
                sender: value.onChallengeFound.sender,
                points: variables.filter.points,
                players: value.onChallengeFound.opponents.map(p => p._id)
            };
            const token = token_1.Tokeniser.tokenise(tokenData);
            const request = {
                _id: value.onChallengeFound._id,
                sender: value.onChallengeFound.sender,
                level: variables.filter.level,
                points: variables.filter.points,
                createdAt: String(new Date().getTime()),
                token,
                time: 9000,
                opponents: value.onChallengeFound.opponents.map(p => String(p._id)).includes(String(variables.filter._id)) ?
                    value.onChallengeFound.sender : value.onChallengeFound.opponents[0],
            };
            return request;
        },
    }),
    __param(0, graphql_1.Args('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [game_filter_1.GameFilter]),
    __metadata("design:returntype", void 0)
], GameResolver.prototype, "onChallengeFound", null);
__decorate([
    graphql_1.Subscription(returns => Boolean, {
        filter: (payload, variables) => {
            return variables._id === payload.onRequestAccepted[1];
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Boolean)
], GameResolver.prototype, "onRequestAccepted", null);
__decorate([
    graphql_1.Subscription(returns => result_model_1.PlaceHolderResult, {
        filter: (payload, variables) => {
            return payload.onRequestRejected.players.includes(String(variables.id));
        },
        resolve: () => {
            return {
                status: true,
            };
        },
    }),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameResolver.prototype, "onRequestRejected", null);
__decorate([
    graphql_1.Subscription(returns => game_model_1.ExpiredRequest, {
        filter: (payload, variables) => {
            return String(payload.onRequestExpired.sender) === String(variables.id);
        },
    }),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameResolver.prototype, "onRequestExpired", null);
__decorate([
    graphql_1.Subscription(returns => game_model_1.Game, {
        filter: (payload, variables) => {
            return payload.onGameStarted.opponents.includes(String(variables.id));
        },
        resolve: (payload, variables) => {
            const result = Object.assign({}, payload.onGameStarted, { opponents: payload.onGameStarted.opponents.map(p => ({ _id: 'fjksfj', username: p })), time: 9000 });
            return result;
        },
    }),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Args('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GameResolver.prototype, "onGameStarted", null);
__decorate([
    graphql_1.Subscription(returns => result_model_1.Results, {
        filter: (payload, variables) => {
            return payload.onGameEnds.players.includes(String(variables.id));
        },
        resolve: (payload, variables) => {
            return {
                won: game_util_1.GameUtil.isWinner(payload.onGameEnds.scores, variables.id),
                points: payload.onGameEnds.points,
                winner: payload.onGameEnds.winner,
            };
        },
    }),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GameResolver.prototype, "onGameEnds", null);
GameResolver = __decorate([
    graphql_1.Resolver('Game'),
    __param(0, common_1.Inject('PUB_SUB')),
    __metadata("design:paramtypes", [apollo_server_express_1.PubSub,
        profile_service_1.ProfileService,
        questions_service_1.QuestionsService,
        points_service_1.PointsService,
        game_service_1.GameService])
], GameResolver);
exports.GameResolver = GameResolver;
//# sourceMappingURL=game.resolver.js.map