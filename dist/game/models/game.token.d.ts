export interface GeneralToken {
    id: string;
}
export interface GameToken extends GeneralToken {
    id: string;
    points: number;
    players: string[];
    acceptedPlayers: string[];
    scores: Array<{
        playerId: string;
        score: number;
        submittedAt: number;
    }>;
}
export interface RequestToken extends Pick<GameToken, Exclude<keyof GameToken, 'scores'>> {
    level: number;
    sender: string;
}
