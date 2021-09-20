import { Resolver, Subscription, Args, Mutation} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import {Inject, UseGuards, ValidationPipe} from '@nestjs/common';
import { Profile } from '../profile/models/profile';
import { ProfileService } from '../profile/profile.service';
import { UpdateProfileInput } from '../profile/dto/update-profile.input';
import { Game, ExpiredRequest, GqlToken } from './models/game.model';
import {GameToken, RequestToken} from './models/game.token';
import { TestGaurd } from '../guards/test.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesAuthGuard } from '../guards/rolesAuth.gaurd';
import { QuestionsService } from '../questions/questionsService/questions.service';
import { Request } from './models/request.model';
import { Results, PlaceHolderResult } from './models/result.model';
import { GameFilter } from './dto/game_filter';
import { Tokeniser } from './utils/token';
import { GameUtil } from './utils/game.util';
import { PointsService } from '../points/points.service';
import { GameService } from './game.service';
import { GameDB } from './models/game.db';
import mongoose from 'mongoose';
const uuid = require('uuid/v1');
import moment from 'moment';
import { InputUpdateProfile } from '../profile/types/input/profile.update';
import { UpdateLocation } from '../profile/dto/updateLocation.input';
import { SendChallengeRequest } from './dto/sendChallengeRequest';



@Resolver('Game')
export class GameResolver {
    gameUtil: GameUtil = null;
    constructor(
        @Inject('PUB_SUB') private pubSub: PubSub,
        private readonly profileService: ProfileService,
        private readonly questionService: QuestionsService,
        private readonly pointsService: PointsService,
        private readonly gameService: GameService,
        ) {
            this.gameUtil = new GameUtil(this.questionService, this.pointsService);
            this.pubSub.subscribe('onActivityResponseReceived', async (message) => {

                const opponents = await this.profileService.findAll({_id: message.onActivityResponseReceived.id});
                const sender = await this.profileService.findOneById(message.onActivityResponseReceived.sender);
                const updatedOpponents =  opponents.filter(op => String(op._id) !== String(message.onActivityResponseReceived.sender))
                if (updatedOpponents.length) {
                    this.pubSub.publish('onChallengeFound', {onChallengeFound: {_id: new mongoose.Types.ObjectId(), sender,
                        opponents: updatedOpponents,
                    }});
                }
            });
    }

    /*----------------------------------
        * MUTATION SECTION
    ----------------------------------*/

    /*+++++++++++++++++++++++++++
        * LOCATION_SECTION
    ++++++++++++++++++++++++++++*/
    @Mutation(returns => [Profile])
    async updateLocation(@Args('data') data: UpdateLocation): Promise<Profile[]> {
        const opponents = await this.profileService.updateLocation(data);
        const sender = opponents.find(player => String(player._id) === String(data.id));
        if (opponents.length > 1) {
            this.pubSub.publish('onActivityResponse', {onActivityResponse: {_id: new mongoose.Types.ObjectId(), sender,
                opponents: opponents.filter(op => String(op._id) !== String(data.id)),
            }});
        }
        return opponents;
    }

    /*+++++++++++++++++++++++++++
        * REQUEST_SECTION
    ++++++++++++++++++++++++++++*/
    @Mutation(input => [Profile])
    async sendChallengeRequest(
        @Args('data', new ValidationPipe({skipMissingProperties: true, skipNullProperties: true})) data: SendChallengeRequest) {
            const opponents = await this.profileService.findAll(
                {
                    'gameStatus.status.online': 1,
                    'personal.username': data.username,
                    'gameStatus.level': data.level,
                    // 'points.points': {$size: {$gt: data.points}}
                }
            );
            const sender = await this.profileService.findOneById(data.id);
            if (opponents.length === 1) {
                this.pubSub.publish('onActivityResponse', {onActivityResponse: {_id: new mongoose.Types.ObjectId(), sender,
                    opponents: opponents.filter(op => String(op._id) !== String(data.id)),
                }});
            }
            return opponents;
    }

    @Mutation(returns => Boolean)
    async acceptRequest(@Args('id') id: string, @Args('token') token: string): Promise<boolean> {

        if (!Tokeniser.verify(token)) {
            this.pubSub.publish('onRequestExpired', {onRequestExpired: {sender: id, status: false}});
            return false;
        }

        const parsedToken = Tokeniser.parse(token);

        if (parsedToken.acceptedPlayers.length !== 2 || String(id) === String(parsedToken.sender._id)) {

            parsedToken.acceptedPlayers = [...parsedToken.acceptedPlayers, id];

            const players: string[] = [
                parsedToken.players[0], // Player One
                parsedToken.sender._id // Player Two
            ];

            const gameToken = Tokeniser.tokenise({...parsedToken, acceptedPlayers: [...parsedToken.acceptedPlayers]}, true);

            this.pubSub.publish('onReceivingToken', {onReceivingToken: {token: gameToken, players}});

        } else {

            this.pubSub.publish('onRequestExpired', {onRequestExpired: {sender: id, status: false}});

        }

        if (parsedToken.acceptedPlayers.length === 2) {
            const game: Game = await this.gameUtil.newGame(token);
            this.pubSub.publish('onGameStarted', {onGameStarted: { ...game, opponents: parsedToken.acceptedPlayers}});
        }
        return true;
    }

    @Mutation(returns => PlaceHolderResult)
     async rejectRequest(@Args('id') id: string, @Args('token') token: string): Promise<{status: boolean}> {
        let parsedToken: RequestToken = null;

        if (!Tokeniser.verify(token)) {

            this.pubSub.publish('onRequestExpired', {onRequestExpired: {sender: id, status: false}});

            return {status: false};
        }

        parsedToken = Tokeniser.parse(token);

        this.pubSub.publish('onRequestRejected', {onRequestRejected: {players: parsedToken.players}});

        return {status: true};
    }

    /*+++++++++++++++++++++++++++
        * ACTIVITY_SECTION
    ++++++++++++++++++++++++++++*/

    @Mutation(returns => Profile)
    async updateActivity(@Args('id') id: string, @Args('sender') sender: string): Promise<Profile> {
        const updatedProfile = await this.profileService.update({_id: id, gameStatus: {
            status: {
                lastOnline: moment().format()
            }
        }});


        this.pubSub.publish('onActivityResponseReceived', {onActivityResponseReceived: {id, sender}});

        return updatedProfile;

    }

    /*+++++++++++++++++++++++++++
        * ANSWERS_SECTION
    ++++++++++++++++++++++++++++*/
    @Mutation(returns => PlaceHolderResult)
    async SubmitAnswers(
        @Args('_id') id: string,
        @Args('token') token: string,
        @Args({name: 'questionIds', type: () => [String]}) questionsIds: string[],
        @Args({name: 'answerIds', type: () => [String]}) answerIds: string[]) {

        let newToken: GameToken = null;
        let parsedToken: GameToken = null;
        let score: number = null;

        if (!Tokeniser.verify(token)) {
            return {status: false};
        }

        parsedToken = Tokeniser.parse(token);
        score = await this.questionService.validateAnswers(questionsIds, answerIds);

        if (parsedToken.scores) {

            if (parsedToken.scores.map(s => String(s.playerId)).includes(String(id))) {
                return {status: true};
            }

            parsedToken.scores = [...parsedToken.scores, {playerId: id, score, submittedAt: new Date().getTime()}];
            newToken = Tokeniser.tokenise(parsedToken, true);

        } else {
            parsedToken.scores = [{playerId: id, score, submittedAt: new Date().getTime()}];
            newToken = Tokeniser.tokenise(parsedToken, true);
        }

        const results = {token: newToken, scores: parsedToken.scores, players: parsedToken.acceptedPlayers, points: parsedToken.points};
        this.pubSub.publish('onReceivingToken', {onReceivingToken: results});

        if (parsedToken.scores.length === 2) {
            const playersResult = GameUtil.players(parsedToken.scores);
            const winner = await this.profileService.findOneById(playersResult.winner);
            const updatedWinner = await this.gameService.addPoints(1, playersResult.winner);
            const updatedLoser = await this.gameService.removePoints(1, playersResult.loser);
            try {
                const createdGame: GameDB = await this.gameService.create({
                    _id: parsedToken.id,
                    players: parsedToken.acceptedPlayers,
                    winner: winner._id,
                    points: 122,
                });
            } catch (err ) {
                console.log(err)
            }
            this.pubSub.publish('onGameEnds', {onGameEnds: {...results, winner: winner.personal.username}});
        }

        return {status: true};
    }

    @Mutation(returns => Results)
    async giveUp(@Args('id') id: string, @Args('token') token: string): Promise<any> {

        let parsedToken: GameToken = null;

        if (!Tokeniser.verify(token)) {

            this.pubSub.publish('onRequestExpired', {onRequestExpired: {sender: id, status: false}});

            return {status: false};
        }

        // Needs modification
        parsedToken = Tokeniser.parse(token);
        const results = {scores: 0, players: parsedToken.players, points: parsedToken.points};
        const playersResult = GameUtil.players(parsedToken.scores);
        const winner = await this.profileService.findOneById(playersResult.winner);
        this.pubSub.publish('onGameEnds', {onGameEnds: {...results, winner: winner.personal.username}});
        return results;
    }

    /*----------------------------------
        * SUBSCRIPTION SECTION
    ----------------------------------*/
     /*+++++++++++++++++++++++++++
        * TOKEN_SECTION
    ++++++++++++++++++++++++++++*/
    @Subscription(returns => GqlToken, {
        filter: (payload, variables) => {
            return payload.onReceivingToken.players.includes(String(variables.id));
        },
    })
    onReceivingToken(@Args('id') id: string) {
        return this.pubSub.asyncIterator('onReceivingToken');
    }

    /*+++++++++++++++++++++++++++
        * ACTIVITY_SECTION
        * ON_ACTIVITY_RESPONSE
    ++++++++++++++++++++++++++++*/
    @Subscription(returns => PlaceHolderResult, {
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
    })
    onActivityResponse(@Args('id') id: string) {
        return this.pubSub.asyncIterator('onActivityResponse');
    }

    /*+++++++++++++++++++++++++++
        * CHALLENGE_REQUEST_SECTION
        * ON_CHALLENGE_FOUND
    ++++++++++++++++++++++++++++*/
    @Subscription(returns => Request, {
        filter: (payload, variables) => {
            return payload.onChallengeFound.opponents.map(p => String(p._id)).includes(String(variables.filter._id))
            || String(variables.filter._id) === String(payload.onChallengeFound.sender._id);
        },
        resolve: (value, variables) => {
            const tokenData: RequestToken = {
                id: value.onChallengeFound._id,
                level: variables.filter.level,
                acceptedPlayers: [],
                sender: value.onChallengeFound.sender,
                points: variables.filter.points,
                players: value.onChallengeFound.opponents.map(p => p._id)
            };

            const token: string = Tokeniser.tokenise(tokenData);
            const request: any = {
                _id: value.onChallengeFound._id,
                sender: value.onChallengeFound.sender,
                level: variables.filter.level,
                points: variables.filter.points,
                createdAt: String(new Date().getTime()),
                token,
                time: 9000,
                opponents:
                    value.onChallengeFound.opponents.map(p => String(p._id)).includes(String(variables.filter._id)) ?
                    value.onChallengeFound.sender : value.onChallengeFound.opponents[0],
            };
            return request;
        },
    })
    onChallengeFound(@Args('filter') filter: GameFilter) {
        return this.pubSub.asyncIterator('onChallengeFound');
    }

    /*+++++++++++++++++++++++++++
        * ON_REQUEST_ACCEPTED
    ++++++++++++++++++++++++++++*/
    @Subscription(returns => Boolean, {
        filter: (payload, variables) => {
            return variables._id === payload.onRequestAccepted[1];
        },
    })
    onRequestAccepted(): boolean {
        return true;
    }

    /*+++++++++++++++++++++++++++
        * ON_REQUEST_REJECTED
    ++++++++++++++++++++++++++++*/
    @Subscription(returns => PlaceHolderResult, {
        filter: (payload, variables) => {
            return payload.onRequestRejected.players.includes(String(variables.id));
        },
        resolve: () => {
            return {
                status: true,
            };
        },
    })
    onRequestRejected(@Args('id') id: string) {
        return this.pubSub.asyncIterator('onRequestRejected');
    }

    /*+++++++++++++++++++++++++++
        * ON_REQUEST_EXPIRED
    ++++++++++++++++++++++++++++*/
    @Subscription(returns => ExpiredRequest, {
        filter: (payload, variables) => {
            return String(payload.onRequestExpired.sender) === String(variables.id);
        },
    })
    onRequestExpired(@Args('id') id: string) {
        return this.pubSub.asyncIterator('onRequestExpired');
    }

    /*+++++++++++++++++++++++++++
        * GAME_SECTION
        * ON_GAME_STARTED
    ++++++++++++++++++++++++++++*/
    @Subscription(returns => Game, {
        filter: (payload, variables) => {
            // if (!Tokeniser.verify(variables.token)) {
            //     return false;
            // }

            return payload.onGameStarted.opponents.includes(String(variables.id));
        },
        resolve: (payload, variables) => {
            const result = {
                ...payload.onGameStarted,
                opponents: payload.onGameStarted.opponents.map(p => ({_id: 'fjksfj', username: p})),
                time: 9000,
            };
            return result;
        },
    })
    onGameStarted(@Args('id') id: string, @Args('token') token: string) {
        return this.pubSub.asyncIterator('onGameStarted');
    }

    /*+++++++++++++++++++++++++++
        * ON_GAME_ENDS
    ++++++++++++++++++++++++++++*/
    @Subscription(returns => Results, {
        filter: (payload, variables) => {
            return payload.onGameEnds.players.includes(String(variables.id));
        },
        resolve: (payload, variables) => {
            return {
                won:  GameUtil.isWinner(payload.onGameEnds.scores, variables.id),
                points: payload.onGameEnds.points,
                winner: payload.onGameEnds.winner,
            };
        },
    })
    onGameEnds(@Args('id') id: string) {
        return this.pubSub.asyncIterator('onGameEnds');
    }
}

// @Roles('player')
    // @UseGuards(RolesAuthGuard)
