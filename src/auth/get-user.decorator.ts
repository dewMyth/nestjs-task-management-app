import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

//ExecutionContext is a built-in NestJS class that gives access to the request object, NEWER FEATURE

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
