
export class Player {
    id: string = null;
    socketId: string = null;
    opponent: Player = null;
    state: string = 'SEARCHING';
    score: number = 0;
    submittedTime: number = null;
    constructor(id, socketId, opponent = null, state = 'SEARCHING') {
        this.id = id;
        this.socketId = socketId;
        this.opponent = opponent;
        this.state = state;
    }

    setScore(score: number) {
        this.score = score;
    }

    submit() {
        this.state = 'SUBMITTED';
        this.submittedTime = new Date().getTime();
    }
}
