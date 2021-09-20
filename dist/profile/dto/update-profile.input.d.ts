export declare class OnlineStatusInput {
    online?: number;
    lastOnline?: string;
    lastLoggedIn?: string;
    onlineTime?: number;
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
export declare class UpdatePersonalInput {
    notificationEmail: string;
    phone: string;
}
export declare class UpdatePaymentType {
    bankAccountName: string;
    bankAccountNumber: string;
    stripeCustomerId: string;
}
export declare class UpdateProfileInput {
    id: string;
    personal: UpdatePersonalInput;
    payment: UpdatePaymentType;
}
