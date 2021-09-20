import { Game } from "./game.class";
export declare class Player {
    id: string;
    socketId: string;
    opponent: Player;
    state: string;
    score: number;
    submittedTime: number;
    private readonly profileService;
    constructor(id: any, socketId: any, opponent?: any, state?: string);
    setScore(score: number): void;
    submit(): void;
    setPoints(player: Player, game: Game): void;
}
