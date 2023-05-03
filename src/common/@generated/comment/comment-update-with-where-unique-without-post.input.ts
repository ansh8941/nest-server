import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Type } from 'class-transformer';
import { CommentUpdateWithoutPostInput } from './comment-update-without-post.input';

@InputType()
export class CommentUpdateWithWhereUniqueWithoutPostInput {

    @Field(() => CommentWhereUniqueInput, {nullable:false})
    @Type(() => CommentWhereUniqueInput)
    where!: CommentWhereUniqueInput;

    @Field(() => CommentUpdateWithoutPostInput, {nullable:false})
    @Type(() => CommentUpdateWithoutPostInput)
    data!: CommentUpdateWithoutPostInput;
}
