import { Injectable, CanActivate, ExecutionContext, Request, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesAuthGuard extends AuthGuard('jwt') {
    context = null;
  constructor(private readonly reflector: Reflector) {
      super();
  }

  getRequest(context: ExecutionContext) {
      this.context = context;
      if (context.switchToWs().getClient() !== undefined) {
        const request = context.switchToHttp().getRequest();
        request.headers = {authorization: `Bearer ${context.switchToWs().getData().token}`};
        return request;
      } else if (context.switchToHttp().getRequest() === undefined) {
        const ctx = GqlExecutionContext.create(context).getContext().req;
        return ctx;
      } else {
        return context.switchToHttp().getRequest();
      }
  }

  handleRequest(err, user, info: Error) {
    // console.log(err, user, info)
    // don't throw 401 error when unauthenticated
    // if (err || !user) {
    //   throw err || new UnauthorizedException();
    // }
    // const roles = this.reflector.get<string[]>('roles', this.context.getHandler());
    // if (!roles) {
    //   return user;
    // }

    // const hasRole = () => user.privacy.roles.some((role) => roles.includes(role));
    // if (!(user && user.privacy.roles && hasRole())) {
    //     throw new UnauthorizedException();
    // }
    return user;
  }
}
