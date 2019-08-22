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
import { Profile } from 'src/profile/models/profile';
import { Player } from './player.class';
import { Request } from './request.class';
import { Game } from './game.class';
import { QuestionsService } from '../questions/questionsService/questions.service';

@WebSocketGateway({path: '/challenge'})
export class ChallengeRequestsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly profileService: ProfileService,
        private readonly roomService: RoomService,
        private readonly questionsService: QuestionsService,
        ) {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('locationChanged')
    async findNearest(client: Client, data: any): Promise<any> {
        const nearest = await this.profileService.updateLocation(data.userId, data.location);
        const nearestIds: string[] = nearest.map(profile => profile._id.toString());

        const request = new Request(
            new Player(data.userId, client.id),
            this.roomService.getReadyPlayers(nearestIds),
        );
        this.roomService.addToRequests(request);
        request.eimit(this.server);
        // console.log(this.roomService.readyRoom, this.roomService.activeRoom)

        return nearest;
    }

    handleConnection(server: any, data) {
        server.userId = server.handshake.query.token;
        const player = new Player(
            server.handshake.query.token,
            server.id,
        );
        this.roomService.addToActive(player);
    }

    handleDisconnect(server: any) {
        const id = server.userId = server.handshake.query.token;
        this.roomService.removeFromActive(id);
    }

    @SubscribeMessage('onAcceptRequest')
    async acceptRequest(client: any, data: any): Promise<any> {
        const request: Request = this.roomService.requestRoom.find((r: Request) => r.id === data.request);
        request.addToAccepted(data.userId);
        if (request && !request.isExpired && request.isReady()) {
            request.setState('ACTIVE');
            const game = new Game(this.questionsService, request);
            this.roomService.addToPlaying(game);
            this.roomService.removeFromRequests(request.id);
            game.start(this.server);
        } else {
            return 'Too late!';
        }
    }

    @SubscribeMessage('onAnswersSubmitted')
    async submitAnswers(client: any, data: any): Promise<any> {
        const game: Game = this.roomService.getActiveGame(data.gameId);
        if (game.state !== 'COMPLETED') {
            game.submitAnswers(data.userId, data.answers);
        }
        if (game.isGameOver) {
            game.announanceResults();
            game.finishGame();
            this.roomService.removeFromPlaying(game.id);
        }
    }
}
