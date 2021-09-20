"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
class Tokeniser {
    static tokenise(data, noExpiry = false) {
        if (!noExpiry) {
            return jwt.sign(Object.assign({}, data), 'secret', { expiresIn: '500000' });
        }
        else {
            return jwt.sign(Object.assign({}, data), 'secret');
        }
    }
    static verify(token) {
        try {
            jwt.verify(token, 'secret');
            return true;
        }
        catch (err) {
            return false;
        }
    }
    static parse(token) {
        return jwt.decode(token);
    }
}
exports.Tokeniser = Tokeniser;
//# sourceMappingURL=token.js.map