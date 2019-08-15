import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
  } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server} from 'socket.io';

@WebSocketGateway({path: '/challenge'})
export class ChallengeRequestsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('locationChanged')
    findNearest(client: Client, data: any): any {
        const random = Math.random();
        if (random > 0.6) {
            return {
                points: 33,
                level: 2,
                opponent: {
                    name: 'John',
                    avatar: {
                        uri: "https://res.cloudinary.com/dxuf2ssx6/image/upload/v1560931309/restaurant/backgrounds/joseph-gonzalez-176749-unsplash.jpg"
                    },
                    win: 22,
                    lost: 12,
                    level: 5,
                },
                time: 3,
                status: 'Pending',
            };
        }
        return null;
    }

    @SubscribeMessage('identity')
    async identity(client: Client, data: number): Promise<string> {
        return 'from server 3';
    }
}
