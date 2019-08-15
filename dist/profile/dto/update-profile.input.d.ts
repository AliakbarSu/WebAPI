import { UpdateLocationInput } from './update-location.input';
declare class GameStatusType {
    level?: number;
    status?: number;
    location: UpdateLocationInput;
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
