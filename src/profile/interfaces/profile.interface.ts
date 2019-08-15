import { Document } from 'mongoose';

export interface Profile extends Document {
  readonly _id: string;
  readonly gameStatus: {
    win: number,
    lost: number,
    status: number,
    level: number,
    location: LocationType,
  };
  readonly points: {
    points: number,
    redeemedPoints: number,
    recievedPoints: RecievePoints;
    sentPoints: SendPoints;
  };
  readonly personal: {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    phone: string,
  };
  readonly privacy: {
    password: string,
    resetPasswordToken: string,
    loginFailedAttempts: number,
  };
}

interface RecievePoints {
  id: string;
  sender: string;
  amount: number;
  timestamp: Date;
}

interface SendPoints {
  id: string;
  recipient: string;
  amount: number;
  timestamp: Date;
}

interface LocationType {
  type: string;
  coordinates: number[];
}
