import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const RolesAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RolesAuthGuard extends RolesAuthGuard_base {
    private readonly reflector;
    context: any;
    constructor(reflector: Reflector);
    getRequest(context: ExecutionContext): any;
    handleRequest(err: any, user: any, info: Error): any;
}
export {};
