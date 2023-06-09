import { BadRequestException, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '@modules/user/services/user.service';
import { UserWhereUniqueInput } from '@common/@generated/user/user-where-unique.input';
import { IPayloadUserJwt } from '@common/global-interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_PRIVATE_KEY,
    });
  }
  public async validate(payload: IPayloadUserJwt) {
    const where: UserWhereUniqueInput = {
      id: payload.userId,
    };
    const user = await this.userService.getUserByUniqueInput(where);
    if (!user) {
      throw new BadRequestException('Unauthorized: user did not authenticated');
    }
    return user;
  }
}
