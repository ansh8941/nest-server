import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { UserWhereUniqueInput } from '@common/@generated/user/user-where-unique.input';
import { UserService } from '../services/user.service';

export const CurrentUser = createParamDecorator(
  async (data, context: ExecutionContext) => {
    let request;
    switch (context.getType() as string) {
      case 'http':
        request = context.switchToHttp().getRequest();
        break;
      case 'graphql':
        request = GqlExecutionContext.create(context).getContext().req;
        break;
      case 'rpc':
        throw new HttpException(
          'Not implemented',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      default:
        throw new HttpException(
          'Not implemented',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }

    const jwtService = new JwtService({ secret: process.env.JWT_PRIVATE_KEY });
    const bearerToken = request.headers.authorization;
    const token = bearerToken.split(' ')[1];
    const decoded = await jwtService.verifyAsync(token);

    const userId = decoded.userId;
    if (!userId) {
      throw new UnauthorizedException('No user found for request');
    }
    return userId;
  },
);
