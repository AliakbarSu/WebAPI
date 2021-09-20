import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { ProfileService } from '../profile/profile.service';
import { RoomService } from './room.service';
import { QuestionsService } from '../questions/questionsService/questions.service';
export declare class ChallengeRequestsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly profileService;
    private readonly roomService;
    private readonly questionsService;
    constructor(profileService: ProfileService, roomService: RoomService, questionsService: QuestionsService);
    server: Server;
    findNearest(client: Client, data: any): Promise<any>;
    handleConnection(server: any, data: any): void;
    handleDisconnect(server: any): void;
    acceptRequest(client: any, data: any): Promise<any>;
    submitAnswers(client: any, data: any): Promise<any>;
}
