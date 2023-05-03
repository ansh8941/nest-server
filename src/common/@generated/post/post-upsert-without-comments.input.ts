import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostUpdateWithoutCommentsInput } from './post-update-without-comments.input';
import { Type } from 'class-transformer';
import { PostCreateWithoutCommentsInput } from './post-create-without-comments.input';

@InputType()
export class PostUpsertWithoutCommentsInput {

    @Field(() => PostUpdateWithoutCommentsInput, {nullable:false})
    @Type(() => PostUpdateWithoutCommentsInput)
    update!: PostUpdateWithoutCommentsInput;

    @Field(() => PostCreateWithoutCommentsInput, {nullable:false})
    @Type(() => PostCreateWithoutCommentsInput)
    create!: PostCreateWithoutCommentsInput;
}
