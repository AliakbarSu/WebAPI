export declare class Tokeniser {
    static tokenise(data: any, noExpiry?: boolean): string;
    static verify(token: string): boolean;
    static parse(token: string): any;
}
