// import { ObjectType, InputType, Field} from 'type-graphql';

// @ObjectType()
// export class Personal {
//     @Field()
//     username: string;
//     @Field()
//     avatar: string;
//     @Field()
//     email: string;
//     @Field()
//     notificationEmail: string;
//     @Field()
//     country: string;
// }

// @ObjectType()
// export class Privacy {
//     @Field()
//     password: string;
//     @Field()
//     resetPasswordToken: string;
//     @Field()
//     loginFailedAttempts: number;
//     @Field(type => [String])
//     roles: string[];
// }

// @ObjectType()
// export class Location {
//     @Field()
//     type: string;
//     @Field()
//     coordinates: number[];
// }

// @ObjectType()
// export class OnlineStatus {
//     @Field()
//     online: number;
//     @Field()
//     lastOnline: string;
//     @Field()
//     lastLoggedIn: string;
//     @Field()
//     onlineTime: number;
// }

// @ObjectType()
// export class GameStatus {
//     @Field()
//     win: number;
//     @Field()
//     lost: number;
//     @Field(type => OnlineStatus)
//     stauts: OnlineStatus;
//     @Field()
//     level: number;
//     @Field(type => Location)
//     location: Location;
// }

// @ObjectType()
// export class ReceivePoints {
//     @Field()
//     id: string;
//     @Field()
//     sender: string;
// }

// @ObjectType()
// export class Payment {
//     @Field()
//     bankAccountName: string;
//     @Field()
//     bankAccountNumber: string;
//     @Field()
//     stripeCustomerId: string;
// }

// @ObjectType()
// export class Profile {
//     @Field()
//     id: string;
//     @Field(type => Personal)
//     personal: Personal;
//     @Field(type => Payment)
//     payment: Payment;
// }
