export declare class Personal {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
}
export declare class Privacy {
    password: string;
    resetPasswordToken: string;
    loginFailedAttempts: number;
}
export declare class Location {
    type: string;
    coordinates: number[];
}
export declare class GameStatus {
    win: number;
    lost: number;
    status: number;
    level: number;
    location: Location;
}
export declare class RecievePoints {
    id: string;
    sender: string;
    amount: number;
    timestamp: Date;
}
export declare class SendPoints {
    id: string;
    recipient: string;
    amount: number;
    timestamp: Date;
}
export declare class Points {
    points: number;
    redeemedPoints: number;
    recievedPoints: RecievePoints;
    sentPoints: SendPoints;
}
export declare class Profile {
    _id: string;
    personal: Personal;
    privacy: Privacy;
    points: Points;
    gameStatus: GameStatus;
}
