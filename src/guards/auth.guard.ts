import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomAuthGuard extends AuthGuard('jwt') {

  getRequest(context: ExecutionContext) {
    if (context.switchToHttp().getRequest() === undefined) {
        return GqlExecutionContext.create(context).getContext().req;
    } else {
        return context.switchToHttp().getRequest();
    }
  }
}
