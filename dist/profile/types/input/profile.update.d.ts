import { Profile, Personal, Privacy, OnlineStatus, GameStatus, LocationType, Payment } from '../../interfaces/profile.interface';
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
declare type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
export declare class InputPersonal implements Pick<Personal, 'email' | 'phone'> {
    email: string;
    phone: string;
}
export declare class InputPrivacy implements Pick<Privacy, 'password'> {
    password: string;
}
export declare class InputLocation implements Pick<LocationType, 'coordinates'> {
    coordinates: number[];
}
export declare class InputOnlineStatus implements Pick<OnlineStatus, 'online'> {
    online: number;
}
export declare class InputGameStatus implements Merge<Pick<GameStatus, 'status' | 'location'>, {
    status: InputOnlineStatus;
}> {
    status: InputOnlineStatus;
    location: LocationType;
}
export declare class InputPayment implements Pick<Payment, 'bankAccountNumber' | 'bankAccountName'> {
    bankAccountName: string;
    bankAccountNumber: string;
}
export declare class InputUpdateProfile implements Merge<Omit<Profile, 'points'>, {
    gameStatus: InputGameStatus;
    personal: InputPersonal;
    privacy: InputPrivacy;
    payment: InputPayment;
}> {
    _id: string;
    personal: Personal;
    privacy: Privacy;
    gameStatus: InputGameStatus;
    payment: Payment;
}
export {};
