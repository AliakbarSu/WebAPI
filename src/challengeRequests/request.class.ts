import { Player } from './player.class';
import { Server} from 'socket.io';
const uuid = require('uuid/v1');

export class Request {
    server: Server = null;
    id: string = null;
    state: string = null;
    sender: Player = null;
    reciepients: Player[] = [];
    acceptedRecipients: Player[] = [];
    createdAt: number = null;
    constructor(sender: Player, reciepients: Player[]) {
        this.id = uuid();
        this.sender = sender;
        this.reciepients = reciepients;
        this.state = 'READY';
        this.createdAt = new Date().getTime();
    }

    eimit(server: Server): null {
        this.server = server;
        if (this.state !== 'READY' || this.reciepients.length === 1) {
            return null;
        }
        this.setState('WAITING_RESPONSE');
        setTimeout(() => {
            if (this.state === 'WAITING_RESPONSE') {
                this.setState('EXPIRED');
                this._eimit('onRequestExpired', {id: this.id});

            }
        }, 10000);

        this._eimit('onNewRequest', { id: this.id });
    }

    get isExpired() {
        return this.state === 'EXPIRED';
    }

    setState(state: string) {
        this.state = state;
    }

    addToAccepted(playerId: string) {
        if (playerId !== this.sender.id && this.acceptedRecipients.length === 1) {
            return;
        }
        if (this.acceptedRecipients.length !== 2) {
            const player: Player = this.reciepients.find((p: Player) => p.id === playerId);
            this.acceptedRecipients.push(player);
        }
    }

    isReady() {
        return this.acceptedRecipients.length === 2;
    }

    private _eimit(event: string, data) {
        this.reciepients.forEach((player: Player) => {
            this.server.sockets.sockets[player.socketId].emit(event, data);
        });
    }
}
