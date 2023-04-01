import { ProfileUpdateOneWithoutUserNestedInput } from '@common/@generated/profile/profile-update-one-without-user-nested.input';
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MinLength(3)
  password?: string;

  @Field(() => ProfileUpdateOneWithoutUserNestedInput, {
    nullable: true,
  })
  profile?: ProfileUpdateOneWithoutUserNestedInput;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  currentHashedRefreshToken?: string;
}
