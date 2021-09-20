import { Player } from './player.class';
import { Server } from 'socket.io';
export declare class Request {
    server: Server;
    id: string;
    state: string;
    sender: Player;
    reciepients: Player[];
    acceptedRecipients: Player[];
    points: number;
    createdAt: number;
    constructor(sender: Player, reciepients: Player[]);
    eimit(server: Server): null;
    readonly isExpired: boolean;
    setState(state: string): void;
    addToAccepted(playerId: string): void;
    isReady(): boolean;
    private _eimit;
}
