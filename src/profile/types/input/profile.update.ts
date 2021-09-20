import { ObjectType, InputType, Field} from 'type-graphql';
import {Profile, Personal, Privacy, OnlineStatus, GameStatus, LocationType, Payment} from '../../interfaces/profile.interface';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

@InputType()
export class InputPersonal implements Pick<Personal, 'email' | 'phone'> {
    @Field()
    email: string;
    @Field()
    phone: string;
}

@InputType()
export class InputPrivacy implements Pick<Privacy, 'password'> {
    @Field()
    password: string;
}

@InputType()
export class InputLocation implements Pick<LocationType, 'coordinates'> {
    coordinates: number[];
}

@InputType()
export class InputOnlineStatus implements Pick<OnlineStatus, 'online'> {
    @Field()
    online: number;
}

@InputType()
export class InputGameStatus implements Merge<Pick<GameStatus, 'status' | 'location'>, {status: InputOnlineStatus}>  {
    @Field(type => InputOnlineStatus)
    status: InputOnlineStatus;
    @Field(type => InputLocation)
    location: LocationType;
}
// @InputType()
// export class InputReceivePoints extends RecievePoints {
// }

@InputType()
export class InputPayment implements Pick<Payment, 'bankAccountNumber' | 'bankAccountName'> {
    @Field()
    bankAccountName: string;
    @Field()
    bankAccountNumber: string;
}

@InputType()
export class InputUpdateProfile implements Merge<Omit<Profile, 'points'>,
    {
        gameStatus: InputGameStatus,
        personal: InputPersonal,
        privacy: InputPrivacy,
        payment: InputPayment
    }> {
    @Field()
    _id: string;
    @Field(type => InputPersonal)
    personal: Personal;
    @Field(type => InputPrivacy)
    privacy: Privacy;
    @Field(type => InputGameStatus)
    gameStatus: InputGameStatus;
    @Field(type => InputPayment)
    payment: Payment;
}
