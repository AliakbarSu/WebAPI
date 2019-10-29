import { PubSub } from 'apollo-server-express';
import { Profile } from '../profile/models/profile';
import { ProfileService } from '../profile/profile.service';
import { UpdateProfileInput } from '../profile/dto/update-profile.input';
import { QuestionsService } from '../questions/questionsService/questions.service';
import { GameFilter } from './dto/game_filter';
import { GameUtil } from './utils/game.util';
import { PointsService } from '../points/points.service';
import { GameService } from './game.service';
export declare class GameResolver {
    private pubSub;
    private readonly profileService;
    private readonly questionService;
    private readonly pointsService;
    private readonly gameService;
    gameUtil: GameUtil;
    constructor(pubSub: PubSub, profileService: ProfileService, questionService: QuestionsService, pointsService: PointsService, gameService: GameService);
    updateLocation(data: UpdateProfileInput): Promise<Profile[]>;
    updateActivity(id: string, sender: string): Promise<Profile>;
    acceptRequest(id: string, token: string): Promise<boolean>;
    rejectRequest(id: string, token: string): Promise<{
        status: boolean;
    }>;
    giveUp(id: string, token: string): Promise<any>;
    SubmitAnswers(id: string, token: string, questionsIds: string[], answerIds: string[]): Promise<{
        status: boolean;
    }>;
    onChallengeFound(filter: GameFilter): AsyncIterator<{}>;
    onActivityResponse(id: string): AsyncIterator<{}>;
    onRequestAccepted(): boolean;
    onRequestRejected(id: string): AsyncIterator<{}>;
    onRequestExpired(id: string): AsyncIterator<{}>;
    onGameStarted(id: string, token: string): AsyncIterator<{}>;
    onGameEnds(id: string): AsyncIterator<{}>;
    onReceivingToken(id: string): AsyncIterator<{}>;
}
