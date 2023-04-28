import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from './models/auth.model';
import { LoginUserInput, RegisterUserInput } from './dto';
import { AuthService } from './services/auth.service';
import { BadRequestException } from '@nestjs/common';
import { IPayloadUserJwt, ISessionAuthToken } from '@common/global-interfaces';
import { User } from '@modules/user/user.model';

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

  /* Mutation*/
  // authRegister
  @Mutation(() => User)
  public async register(@Args('data') data: RegisterUserInput) {
    const user = await this.authService.register(data);
    // --> Todo: Send verification
    // If process.env === 'production'

    // Test send welcome after registration
    // if (user && process.env.NODE_ENV === 'development') {
    //   await this.emailService.sendWelcome(user.email);
    // }
    return user;
  }
}
