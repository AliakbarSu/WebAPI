import { Personal, GameStatus, Location, Privacy } from '../models/profile';
declare class PersonalInput implements Partial<Personal> {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}
declare class LocationInput implements Partial<Location> {
    type: string;
    coordinates: number[];
}
declare class GameStatusInput implements Partial<GameStatus> {
    level: number;
    location: LocationInput;
}
export declare class NewProfileInput {
    personal: PersonalInput;
    gameStatus: GameStatusInput;
    privacy: Privacy;
}
export {};
