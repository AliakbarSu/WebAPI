
export class Points {
    amount: number = 0;
    sendable: boolean = false;
    createdAt: number = null;

    constructor(amount: number, sendable: boolean) {
        this.amount = amount;
        this.sendable = sendable;
        this.createdAt = new Date().getTime();
    }
}
