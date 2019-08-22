export declare class Player {
    id: string;
    socketId: string;
    opponent: Player;
    state: string;
    score: number;
    submittedTime: number;
    constructor(id: any, socketId: any, opponent?: any, state?: string);
    setScore(score: number): void;
    submit(): void;
}
