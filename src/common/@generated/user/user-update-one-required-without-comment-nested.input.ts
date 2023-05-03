import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCommentInput } from './user-create-without-comment.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCommentInput } from './user-create-or-connect-without-comment.input';
import { UserUpsertWithoutCommentInput } from './user-upsert-without-comment.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithoutCommentInput } from './user-update-without-comment.input';

@InputType()
export class UserUpdateOneRequiredWithoutCommentNestedInput {

    @Field(() => UserCreateWithoutCommentInput, {nullable:true})
    @Type(() => UserCreateWithoutCommentInput)
    create?: UserCreateWithoutCommentInput;

    @Field(() => UserCreateOrConnectWithoutCommentInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCommentInput)
    connectOrCreate?: UserCreateOrConnectWithoutCommentInput;

    @Field(() => UserUpsertWithoutCommentInput, {nullable:true})
    @Type(() => UserUpsertWithoutCommentInput)
    upsert?: UserUpsertWithoutCommentInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: UserWhereUniqueInput;

    @Field(() => UserUpdateWithoutCommentInput, {nullable:true})
    @Type(() => UserUpdateWithoutCommentInput)
    update?: UserUpdateWithoutCommentInput;
}
