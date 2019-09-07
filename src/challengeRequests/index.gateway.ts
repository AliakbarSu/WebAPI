import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WsException,
  } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server} from 'socket.io';
import { ProfileService } from '../profile/profile.service';
import { RoomService } from './room.service';
import { Profile } from '../profile/models/profile';
import { Player } from './player.class';
import { Request } from './request.class';
import { Game } from './game.class';
import { QuestionsService } from '../questions/questionsService/questions.service';
import { UseGuards, Req } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { RolesAuthGuard } from '../guards/rolesAuth.gaurd';
import { Request as RQ } from 'express';
import { PointsService } from '../points/points.service';

@WebSocketGateway({path: '/challenge', origins: '*:*' })
export class ChallengeRequestsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly profileService: ProfileService,
        private readonly roomService: RoomService,
        private readonly questionsService: QuestionsService,
        private readonly pointsService: PointsService,
        ) {}

    @WebSocketServer()
    server: Server;

    @Roles('player')
    @UseGuards(RolesAuthGuard)
    @SubscribeMessage('locationChanged')
    async findNearest(client: Client, data: any): Promise<any> {

        try {
            const user = (client as any).user;
            const nearest = await this.profileService.updateLocation(String(user._id), data.location);
            const nearestIds: string[] = nearest.map(profile => profile._id.toString());

            const request = new Request(
                new Player(this.profileService, user._id, client.id),
                this.roomService.getReadyPlayers(nearestIds),
            );
            this.roomService.addToRequests(request);
            request.eimit(this.server);
            // console.log(this.roomService.readyRoom, this.roomService.activeRoom)

            return nearest;
        } catch (err) {
            console.log(err)
        }
    }

    handleConnection(server: any, data) {
        server.userId = server.handshake.query.userId;
        const player = new Player(
            this.profileService,
            server.handshake.query.userId,
            server.id,
        );
        this.roomService.addToActive(player);
    }

    handleDisconnect(server: any) {
        const id = server.userId = server.handshake.query.userId;
        this.roomService.removeFromActive(id);
    }

    // @Roles('player')
    @UseGuards(RolesAuthGuard)
    @SubscribeMessage('onAcceptRequest')
    async acceptRequest(client: any, data: any): Promise<any> {
        const user = client.user;
        const request: Request = this.roomService.requestRoom.find((r: Request) => r.id === data.request);
        request.addToAccepted(user._id);
        if (request && !request.isExpired && request.isReady()) {
            request.setState('ACTIVE');
            const game = new Game(this.questionsService, this.pointsService, request);
            this.roomService.addToPlaying(game);
            this.roomService.removeFromRequests(request.id);
            game.start(this.server);
        } else {
            return 'Too late!';
        }

    }

    @UseGuards(RolesAuthGuard)
    @SubscribeMessage('onAnswersSubmitted')
    async submitAnswers(client: any, data: any): Promise<any> {
        try {
            const game: Game = this.roomService.getActiveGame(data.gameId);
            if (game.state !== 'COMPLETED') {
                game.submitAnswers(client.user._id, data.answers);
            }
            if (game.isGameOver) {
                game.announanceResults();
                game.finishGame();
                this.roomService.removeFromPlaying(game.id);
            }
        } catch(err) {
            console.log(err)
        }
        
    }
}
