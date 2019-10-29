import { UpdateLocationInput } from './update-location.input';
declare class InputRequest {
    status?: string;
    opponent?: string;
    created_at?: number;
    updated_at?: number;
}
export declare class OnlineStatusInput {
    online?: number;
    lastOnline?: string;
    lastLoggedIn?: string;
    onlineTime?: number;
}
declare class GameStatusType {
    level?: number;
    status?: OnlineStatusInput;
    location?: UpdateLocationInput;
    request?: InputRequest;
}
export declare class InputRecievePoints {
    id: string;
    sender?: string;
    amount?: number;
    timestamp?: Date;
}
export declare class InputSendPoints {
    id?: string;
    recipient?: string;
    amount?: number;
    timestamp?: Date;
}
export declare class InputPoint {
    amount?: number;
    sendable?: boolean;
    createdAt?: number;
}
export declare class InputPoints {
    points?: InputPoint[];
    redeemedPoints?: number;
    recievedPoints?: InputRecievePoints;
    sentPoints?: InputSendPoints;
}
export declare class UpdateProfileInput {
    _id: string;
    firstName?: string;
    gameStatus?: GameStatusType;
    lastName?: string;
    username?: string;
    password?: string;
    points?: InputPoints;
    email?: string;
}
export {};
