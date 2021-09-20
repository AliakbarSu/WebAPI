import { Document } from 'mongoose';
export interface RecievePoints {
    id: string;
    sender: string;
    amount: number;
    timestamp: Date;
}
export interface SendPoints {
    id: string;
    recipient: string;
    amount: number;
    timestamp: Date;
}
export interface LocationType {
    type: string;
    coordinates: number[];
}
export interface OnlineStatus {
    online: number;
    lastOnline: Date;
    lastLoggedIn: Date;
    onlineTime: number;
}
export interface Personal {
    firstName: string;
    lastName: string;
    avatar: string;
    username: string;
    email: string;
    phone: string;
}
export interface Privacy {
    password: string;
    resetPasswordToken: string;
    loginFailedAttempts: number;
    roles: string[];
}
export interface Payment {
    bankAccountName: string;
    bankAccountNumber: string;
    stripeCustomerId: string;
}
export interface Points {
    points: [{
        amount: number;
        sendable: boolean;
        createdAt: boolean;
    }];
    redeemedPoints: number;
    recievedPoints: RecievePoints;
    sentPoints: SendPoints;
}
export interface GameStatus {
    win: number;
    lost: number;
    status: OnlineStatus;
    level: number;
    location: LocationType;
    request: {
        status: string;
        opponent: string;
        created_at: number;
        updated_at: number;
    };
}
export interface Profile extends Document {
    readonly _id: string;
    readonly gameStatus: GameStatus;
    readonly points: Points;
    readonly personal: Personal;
    readonly privacy: Privacy;
    readonly payment: Payment;
}
