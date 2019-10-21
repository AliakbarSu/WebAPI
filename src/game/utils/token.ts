import * as jwt from 'jsonwebtoken';

export class Tokeniser {
    static tokenise(data, noExpiry = false): string {
        if (!noExpiry) {
            return jwt.sign({...data}, 'secret', {expiresIn: '500000'});
        } else {
            return jwt.sign({...data}, 'secret');
        }
    }

    static verify(token: string): boolean {
        try {
            jwt.verify(token, 'secret');
            return true;
        } catch (err) {
            return false;
        }
    }

    static parse(token: string): any {
        return jwt.decode(token);
    }
}
