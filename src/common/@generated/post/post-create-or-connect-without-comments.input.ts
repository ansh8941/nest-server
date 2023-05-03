import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostWhereUniqueInput } from './post-where-unique.input';
import { Type } from 'class-transformer';
import { PostCreateWithoutCommentsInput } from './post-create-without-comments.input';

@InputType()
export class PostCreateOrConnectWithoutCommentsInput {

    @Field(() => PostWhereUniqueInput, {nullable:false})
    @Type(() => PostWhereUniqueInput)
    where!: PostWhereUniqueInput;

    @Field(() => PostCreateWithoutCommentsInput, {nullable:false})
    @Type(() => PostCreateWithoutCommentsInput)
    create!: PostCreateWithoutCommentsInput;
}
