import { Player } from "./player.class";
import { Request } from "./request.class";
import { Server } from "socket.io";
export declare class Game {
    server: Server;
    id: string;
    state: string;
    players: Player[];
    questions: string[];
    constructor(request: Request, questions: string[]);
    start(server: Server): void;
    validateAnswers(answers: any): void;
    private _eimit;
}
