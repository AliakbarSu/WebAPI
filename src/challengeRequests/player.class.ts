
export class Player {
    id: string = null;
    socketId: string = null;
    opponent: string = null;
    state: string = 'SEARCHING';
    constructor(id, socketId, opponent = null, state = 'SEARCHING') {
        this.id = id;
        this.socketId = socketId;
        this.opponent = opponent;
        this.state = state;
    }
}
