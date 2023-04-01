import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { UserExitsValidator } from '@modules/user/decorators';
import { ProfileCreateNestedOneWithoutUserInput } from '@common/@generated/profile/profile-create-nested-one-without-user.input';

@InputType()
export class RegisterUserInput {
  @Field(() => String, {
    nullable: false,
  })
  @Validate(UserExitsValidator)
  @IsEmail()
  email!: string;

  @Field(() => String, {
    nullable: false,
  })
  @IsString()
  @MinLength(3)
  password!: string;

  @Field(() => ProfileCreateNestedOneWithoutUserInput, {
    nullable: true,
  })
  profile?: ProfileCreateNestedOneWithoutUserInput;
}
