import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from './models/auth.model';
import { LoginUserInput, RegisterUserInput, ResetPasswordInput } from './dto';
import { AuthService } from './services/auth.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  IPayloadUserJwt,
  IRequestWithUser,
  ISessionAuthToken,
} from '@common/global-interfaces';
import { ChangePasswordInput } from '@modules/user/dto';
import { JwtGuard, JwtRefreshTokenGuard } from './guards';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Auth)
  public async login(@Args('data') data: LoginUserInput) {
    const { email, password } = data;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload: IPayloadUserJwt = {
      userId: user.id,
    };
    const token: ISessionAuthToken =
      await this.authService.generateAuthTokenFromLogin(payload);
    return token;
  }
}
