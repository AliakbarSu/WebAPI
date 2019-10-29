import { Document } from 'mongoose';

export interface Profile extends Document {
  readonly _id: string;
  readonly gameStatus: {
    win: number,
    lost: number,
    status: OnlineStatus,
    level: number,
    location: LocationType,
    request: {
      status: string,
      opponent: string,
      created_at: number,
      updated_at: number,
    },
  };
  readonly points: {
    points: [{
      amount: number;
      sendable: boolean;
      createdAt: boolean;
    }],
    redeemedPoints: number,
    recievedPoints: RecievePoints;
    sentPoints: SendPoints;
  };
  readonly personal: {
    firstName: string,
    lastName: string,
    avatar: string,
    username: string,
    email: string,
    phone: string,
  };
  readonly privacy: {
    password: string,
    resetPasswordToken: string,
    loginFailedAttempts: number,
    roles: string[],
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

interface OnlineStatus {
  online: number;
  lastOnline: Date;
  lastLoggedIn: Date;
  onlineTime: number;
}