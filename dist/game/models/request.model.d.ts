import { Profile } from '../../profile/models/profile';
export declare class Request {
    _id: string;
    points: number;
    sender: Profile;
    level: number;
    opponents: Profile;
    token: string;
    time: number;
    createdAt: string;
}
