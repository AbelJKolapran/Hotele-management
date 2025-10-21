import { ExecutionContext } from '@nestjs/common';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
}
export declare class AdminGuard {
    canActivate(context: ExecutionContext): boolean;
}
export declare class UserGuard {
    canActivate(context: ExecutionContext): boolean;
}
export {};
