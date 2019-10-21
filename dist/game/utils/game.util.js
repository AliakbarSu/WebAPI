"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
const uuid = require('uuid/v1');
class GameUtil {
    constructor(questionService, pointsService) {
        this.questionService = questionService;
        this.pointsService = pointsService;
        this.id = null;
        this.state = null;
        this.questions = [];
    }
    async newGame(requestToken) {
        const parsedToken = token_1.Tokeniser.parse(requestToken);
        const questionsObj = await this.questionService.generateQuestion(4, 1, 'general');
        return Object.assign({ _id: uuid() }, parsedToken.opponents, { questions: questionsObj, createdAt: new Date().getTime().toString() });
    }
    static isWinner(scores, playerId) {
        const foundPlayer = scores.find(p => String(p.playerId) === String(playerId));
        const otherPlayers = scores.filter(p => String(p.playerId) !== String(playerId));
        if (foundPlayer) {
            return !Boolean(otherPlayers.find(p => p.score > foundPlayer.score));
        }
        return false;
    }
    static getWinner(scores) {
        const winnerScore = Math.max(...scores.map(s => s.score));
        const player = scores.find(s => s.score === winnerScore);
        return String(player.playerId);
    }
}
exports.GameUtil = GameUtil;
//# sourceMappingURL=game.util.js.map