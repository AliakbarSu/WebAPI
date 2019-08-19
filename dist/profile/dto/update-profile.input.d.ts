import { UpdateLocationInput } from './update-location.input';
declare class Request {
    status?: string;
    opponent?: string;
    created_at?: number;
    updated_at?: number;
}
declare class GameStatusType {
    level?: number;
    status?: number;
    location?: UpdateLocationInput;
    request?: Request;
}
export declare class UpdateProfileInput {
    _id: string;
    firstName?: string;
    gameStatus?: GameStatusType;
    lastName?: string;
    username?: string;
    password?: string;
    email?: string;
}
export {};
