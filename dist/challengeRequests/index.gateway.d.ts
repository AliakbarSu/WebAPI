import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { ProfileService } from '../profile/profile.service';
import { RoomService } from './room.service';
import { QuestionsService } from '../questions/questionsService/questions.service';
import { PointsService } from '../points/points.service';
export declare class ChallengeRequestsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly profileService;
    private readonly roomService;
    private readonly questionsService;
    private readonly pointsService;
    constructor(profileService: ProfileService, roomService: RoomService, questionsService: QuestionsService, pointsService: PointsService);
    server: Server;
    findNearest(client: Client, data: any): Promise<any>;
    handleConnection(server: any, data: any): void;
    handleDisconnect(server: any): void;
    acceptRequest(client: any, data: any): Promise<any>;
    submitAnswers(client: any, data: any): Promise<any>;
}
