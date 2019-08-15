import { Client, Server } from 'socket.io';
export declare class ChallengeRequestsGateway {
    server: Server;
    findNearest(client: Client, data: any): any;
    identity(client: Client, data: number): Promise<string>;
}
