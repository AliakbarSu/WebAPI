import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const RolesGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RolesGuard extends RolesGuard_base {
    private readonly reflector;
    context: any;
    constructor(reflector: Reflector);
    getRequest(context: ExecutionContext): any;
    handleRequest(err: any, user: any, info: Error): any;
}
export {};
