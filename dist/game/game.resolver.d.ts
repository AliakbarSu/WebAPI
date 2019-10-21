import { PubSub } from 'apollo-server-express';
import { Profile } from '../profile/models/profile';
import { ProfileService } from '../profile/profile.service';
import { UpdateProfileInput } from '../profile/dto/update-profile.input';
import { QuestionsService } from '../questions/questionsService/questions.service';
import { GameFilter } from './dto/game_filter';
import { GameUtil } from './utils/game.util';
import { PointsService } from '../points/points.service';
export declare class GameResolver {
    private pubSub;
    private readonly profileService;
    private readonly questionService;
    private readonly pointsService;
    gameUtil: GameUtil;
    constructor(pubSub: PubSub, profileService: ProfileService, questionService: QuestionsService, pointsService: PointsService);
    SubmitAnswers(id: string, token: string, questionsIds: string[], answerIds: string[]): Promise<{
        status: boolean;
    }>;
    rejectRequest(id: string, token: string): Promise<{
        status: boolean;
    }>;
    giveUp(id: string, token: string): Promise<any>;
    acceptRequest(id: string, token: string): Promise<boolean>;
    updateLocation(data: UpdateProfileInput): Promise<Profile[]>;
    onRequestRejected(id: string): AsyncIterator<{}>;
    onGameStarted(id: string, token: string): AsyncIterator<{}>;
    onRequestAccepted(): boolean;
    onChallengeFound(filter: GameFilter): AsyncIterator<{}>;
    onGameEnds(id: string): AsyncIterator<{}>;
    onRequestExpired(id: string): AsyncIterator<{}>;
    onReceivingToken(id: string): AsyncIterator<{}>;
}
