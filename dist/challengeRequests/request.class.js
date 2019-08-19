"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require('uuid/v1');
class Request {
    constructor(sender, reciepients) {
        this.server = null;
        this.id = null;
        this.state = null;
        this.sender = null;
        this.reciepients = [];
        this.acceptedRecipients = [];
        this.createdAt = null;
        this.id = uuid();
        this.sender = sender;
        this.reciepients = reciepients;
        this.state = 'READY';
        this.createdAt = new Date().getTime();
    }
    eimit(server) {
        this.server = server;
        if (this.state !== 'READY' || this.reciepients.length === 1) {
            return null;
        }
        this.setState('WAITING_RESPONSE');
        setTimeout(() => {
            if (this.state === 'WAITING_RESPONSE') {
                this.setState('EXPIRED');
                this._eimit('onRequestExpired', { id: this.id });
            }
        }, 10000);
        this._eimit('onNewRequest', { id: this.id });
    }
    get isExpired() {
        return this.state === 'EXPIRED';
    }
    setState(state) {
        this.state = state;
    }
    addToAccepted(playerId) {
        if (playerId !== this.sender.id && this.acceptedRecipients.length === 1) {
            return;
        }
        if (this.acceptedRecipients.length !== 2) {
            const player = this.reciepients.find((p) => p.id === playerId);
            this.acceptedRecipients.push(player);
        }
    }
    isReady() {
        return this.acceptedRecipients.length === 2;
    }
    _eimit(event, data) {
        this.reciepients.forEach((player) => {
            this.server.sockets.sockets[player.socketId].emit(event, data);
        });
    }
}
exports.Request = Request;
//# sourceMappingURL=request.class.js.map