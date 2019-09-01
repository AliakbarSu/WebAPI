import { ExecutionContext } from '@nestjs/common';
declare const CustomAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class CustomAuthGuard extends CustomAuthGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
