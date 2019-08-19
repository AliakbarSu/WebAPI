import { Player } from "./player.class";
import { Request } from "./request.class";
import { Server } from "socket.io";
const uuid = require('uuid/v1');

export class Game {
    server: Server;
    id: string = null;
    state: string = null;
    players: Player[] = [];
    questions: string[] = [];
    constructor(request: Request, questions: string[]) {
        this.id = uuid();
        this.state = 'PLAYING';
        this.players = request.acceptedRecipients;
    }

    start(server: Server) {
        this.server = server;
        this._eimit('onGameStarted', this.questions);
    }

    validateAnswers(answers) {
        
    }

    private _eimit(event: string, data) {
        this.players.forEach((player: Player) => {
            this.server.sockets.sockets[player.socketId].emit(event, data);
        });
    }
}
