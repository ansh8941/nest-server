import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Type } from 'class-transformer';
import { CommentCreateWithoutPostInput } from './comment-create-without-post.input';

@InputType()
export class CommentCreateOrConnectWithoutPostInput {

    @Field(() => CommentWhereUniqueInput, {nullable:false})
    @Type(() => CommentWhereUniqueInput)
    where!: CommentWhereUniqueInput;

    @Field(() => CommentCreateWithoutPostInput, {nullable:false})
    @Type(() => CommentCreateWithoutPostInput)
    create!: CommentCreateWithoutPostInput;
}
