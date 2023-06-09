import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';
import { User } from '@modules/user/user.model';
import { ProfileWhereUniqueInput } from '@common/@generated/profile/profile-where-unique.input';
import { UserWhereUniqueInput } from '@common/@generated/user/user-where-unique.input';
import { CreateProfileInput, UpdateProfileInput } from './dto';
import { CurrentUser } from '@modules/user/decorators';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';
import { GraphQLResolveInfo } from 'graphql';

@Resolver(() => Profile)
@UseGuards(JwtGuard)
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  /* Query */
  @Query(() => Profile)
  public async profileCurrentUser(
    @CurrentUser() userId: string,
    @Info() info?: GraphQLResolveInfo,
  ) {
    const where: ProfileWhereUniqueInput = {
      userId: userId,
    };
    return await this.profileService.getProfile(where, info);
  }
  @Query(() => Profile)
  public async profile(
    @Args('where') where: UserWhereUniqueInput,
    @Info() info?: GraphQLResolveInfo,
  ) {
    return await this.profileService.getProfile(where, info);
  }

  /* Mutations */
  @Mutation(() => Profile)
  public async createProfile(
    @Args('data') input: CreateProfileInput,
    @CurrentUser() userId: string,
  ) {
    return await this.profileService.createProfile({ input, userId });
  }

  @Mutation(() => Profile)
  public async updateProfile(
    @Args('where') where: ProfileWhereUniqueInput,
    @Args('data') data: UpdateProfileInput,
  ) {
    return await this.profileService.updateProfile(where, data);
  }

  /**
   * We don't need ResolvedField any more when use Prisma select
   */
  // @ResolveField(() => User)
  // public async user(@Parent() profile: Profile) {
  //   const where: Prisma.ProfileWhereUniqueInput = {
  //     id: profile.id,
  //   };
  //   return await this.profileService.getUserOfProfile(where);
  // }
}
