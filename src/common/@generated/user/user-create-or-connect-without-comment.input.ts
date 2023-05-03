import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCommentInput } from './user-create-without-comment.input';

@InputType()
export class UserCreateOrConnectWithoutCommentInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: UserWhereUniqueInput;

    @Field(() => UserCreateWithoutCommentInput, {nullable:false})
    @Type(() => UserCreateWithoutCommentInput)
    create!: UserCreateWithoutCommentInput;
}
