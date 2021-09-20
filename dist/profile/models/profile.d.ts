export declare class Personal {
    firstName?: string;
    lastName?: string;
    avatar: string;
    username: string;
    email: string;
    phone: string;
    notificationEmail: string;
    country: string;
}
export declare class Payment {
    bankAccountName: string;
    bankAccountNumber: string;
    stripeCustomerId: string;
}
export declare class Privacy {
    password: string;
    resetPasswordToken: string;
    loginFailedAttempts: number;
    roles: string[];
}
export declare class Location {
    type: string;
    coordinates: number[];
}
export declare class OnlineStatus {
    online: number;
    lastOnline: string;
    lastLoggedIn: string;
    onlineTime: number;
}
export declare class GameStatus {
    win: number;
    lost: number;
    status: OnlineStatus;
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
export declare class Point {
    amount: number;
    sendable: boolean;
    createdAt: number;
}
export declare class Points {
    points: Point[];
    redeemedPoints: number;
    recievedPoints: RecievePoints;
    sentPoints: SendPoints;
}
export declare class Profile {
    _id: string;
    personal: Personal;
    privacy: Privacy;
    payment: Payment;
    points: Points;
    gameStatus: GameStatus;
}
