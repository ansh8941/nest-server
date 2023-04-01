import { ProfileCreateNestedOneWithoutUserInput } from '@common/@generated/profile/profile-create-nested-one-without-user.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, {
    nullable: false,
  })
  email!: string;

  @Field(() => String, {
    nullable: false,
  })
  password!: string;

  @Field(() => ProfileCreateNestedOneWithoutUserInput, {
    nullable: true,
  })
  profile?: ProfileCreateNestedOneWithoutUserInput;
}
