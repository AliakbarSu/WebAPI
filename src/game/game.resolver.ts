import { Resolver, Subscription, Args, Mutation, Query } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import {Inject, UseGuards} from '@nestjs/common';
import { Profile } from '../profile/models/profile';
import { ProfileService } from '../profile/profile.service';
import { UpdateProfileInput } from '../profile/dto/update-profile.input';
import { Game, ExpiredRequest, GameToken } from './models/game.model';
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

@Resolver('Game')
export class GameResolver {
    gameUtil: GameUtil = null;
    constructor(
        @Inject('PUB_SUB') private pubSub: PubSub,
        private readonly profileService: ProfileService,
        private readonly questionService: QuestionsService,
        private readonly pointsService: PointsService,
        ) {
            this.gameUtil = new GameUtil(this.questionService, this.pointsService);
    }

    // @Query(returns => Game)
    // async getGame(@Args('token') token: string): Promise<any> {
    //     return {
    //         id: 'kfjsf',
    //         questions: [
    //             {
    //                 question: 'fjksfjfk',
    //                 answers: [{id: 'ksfjsf', text: 'fsjfj', test: 'fjksjf'}]
    //             },
    //             {
    //                 question: 'fjksfjfk',
    //                 answers: [{id: 'ksfjsf', text: 'fsjfj', test: 'jfksfj'}]
    //             }
    //         ]
    //     }
    // }

    @Mutation(returns => PlaceHolderResult)
    async SubmitAnswers(
        @Args('_id') id: string,
        @Args('token') token: string,
        @Args({name: 'questionIds', type: () => [String]}) questionsIds: string[],
        @Args({name: 'answerIds', type: () => [String]}) answerIds: string[]) {
        // if (!Tokeniser.verify(token)) {
        //     return {status: false};
        // }
        try {
            const parsedToken = Tokeniser.parse(token);
            const scoreResults = await this.questionService.validateAnswers(questionsIds, answerIds);
            const score = scoreResults.filter(v => v).length;
            let newToken: string = null;
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
                const winner = await this.profileService.findOneById(GameUtil.getWinner(parsedToken.scores));
                this.pubSub.publish('onGameEnds', {onGameEnds: {...results, winner: winner.personal.username}});
            }
            return {status: true};
        } catch (err) {
            console.log(err);
        }
    }
    @Mutation(returns => PlaceHolderResult)
     async rejectRequest(@Args('id') id: string, @Args('token') token: string): Promise<{status: boolean}> {
        // if (!Tokeniser.verify(token)) {
        //     this.pubSub.publish('onRequestExpired', {onRequestExpired: {sender: id, status: false}});
        //     return false;
        // }
        const parsedToken = Tokeniser.parse(token);
        this.pubSub.publish('onRequestRejected', {onRequestRejected: {players: parsedToken.acceptedPlayers}});
        return {status: true};
    }

    @Mutation(returns => Results)
    async giveUp(@Args('id') id: string, @Args('token') token: string): Promise<any> {
        const parsedToken = Tokeniser.parse(token);
        const results = {scores: 0, players: parsedToken.players, points: parsedToken.points};
        const winner = await this.profileService.findOneById(GameUtil.getWinner(parsedToken.scores));
        this.pubSub.publish('onGameEnds', {onGameEnds: {...results, winner: winner.personal.username}});
        return results;
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
            const gameToken = Tokeniser.tokenise({...parsedToken, acceptedPlayers: [...parsedToken.acceptedPlayers]}, true);
            this.pubSub.publish('onReceivingToken', {onReceivingToken: {token: gameToken, players: [
                                                                                                parsedToken.players[0],
                                                                                                parsedToken.sender._id
                                                                                            ]}});
        } else {
            this.pubSub.publish('onRequestExpired', {onRequestExpired: {sender: id, status: false}});
        }

        if (parsedToken.acceptedPlayers.length === 2) {
            const game: Game = await this.gameUtil.newGame(token);
            this.pubSub.publish('onGameStarted', {onGameStarted: { ...game, opponents: parsedToken.acceptedPlayers}});
        }
        return true;
    }

    @Mutation(returns => [Profile])
    async updateLocation(@Args('data') data: UpdateProfileInput): Promise<Profile[]> {
        const opponents = await this.profileService.updateLocation(data);
        const sender = opponents.find(player => String(player._id) === String(data._id));
        if (opponents.length > 1) {
            this.pubSub.publish('onChallengeFound', {onChallengeFound: {
                _id: 'testing',
                sender,
                opponents: opponents.filter(op => String(op._id) !== String(data._id)),
            }});
        }
        return opponents;
    }

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

    @Subscription(returns => Boolean, {
        filter: (payload, variables) => {
            return variables._id === payload.onRequestAccepted[1];
        },
    })
    onRequestAccepted(): boolean {
        return true;
    }

    @Subscription(returns => Request, {
        filter: (payload, variables) => {
            return payload.onChallengeFound.opponents.map(p => String(p._id)).includes(String(variables.filter._id))
            || String(variables.filter._id) === String(payload.onChallengeFound.sender._id);
        },
        resolve: (value, variables) => {
            const token = Tokeniser.tokenise({level: variables.filter.level,
                acceptedPlayers: [],
                sender: value.onChallengeFound.sender,
                points: variables.filter.points,
                players: value.onChallengeFound.opponents.map(p => p._id)});
            const request: any = {
                _id: value.onChallengeFound._id,
                test: 'fjksfjasf',
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

    @Subscription(returns => ExpiredRequest, {
        filter: (payload, variables) => {
            return String(payload.onRequestExpired.sender) === String(variables.id);
        },
    })
    onRequestExpired(@Args('id') id: string) {
        return this.pubSub.asyncIterator('onRequestExpired');
    }

    @Subscription(returns => GameToken, {
        filter: (payload, variables) => {
            return payload.onReceivingToken.players.includes(String(variables.id));
        },
    })
    onReceivingToken(@Args('id') id: string) {
        return this.pubSub.asyncIterator('onReceivingToken');
    }
}

// @Roles('player')
    // @UseGuards(RolesAuthGuard)
