export declare class Tokeniser {
    static tokenise(data: any, noExpiry?: boolean): any;
    static verify(token: string): boolean;
    static parse(token: string): any;
}
