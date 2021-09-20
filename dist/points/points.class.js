"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Points {
    constructor(amount, sendable) {
        this.amount = 0;
        this.sendable = false;
        this.createdAt = null;
        this.amount = amount;
        this.sendable = sendable;
        this.createdAt = new Date().getTime();
    }
}
exports.Points = Points;
//# sourceMappingURL=points.class.js.map