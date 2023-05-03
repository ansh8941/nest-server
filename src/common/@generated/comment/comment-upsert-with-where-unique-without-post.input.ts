import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Type } from 'class-transformer';
import { CommentUpdateWithoutPostInput } from './comment-update-without-post.input';
import { CommentCreateWithoutPostInput } from './comment-create-without-post.input';

@InputType()
export class CommentUpsertWithWhereUniqueWithoutPostInput {

    @Field(() => CommentWhereUniqueInput, {nullable:false})
    @Type(() => CommentWhereUniqueInput)
    where!: CommentWhereUniqueInput;

    @Field(() => CommentUpdateWithoutPostInput, {nullable:false})
    @Type(() => CommentUpdateWithoutPostInput)
    update!: CommentUpdateWithoutPostInput;

    @Field(() => CommentCreateWithoutPostInput, {nullable:false})
    @Type(() => CommentCreateWithoutPostInput)
    create!: CommentCreateWithoutPostInput;
}
