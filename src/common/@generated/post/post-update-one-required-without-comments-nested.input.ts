import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PostCreateWithoutCommentsInput } from './post-create-without-comments.input';
import { Type } from 'class-transformer';
import { PostCreateOrConnectWithoutCommentsInput } from './post-create-or-connect-without-comments.input';
import { PostUpsertWithoutCommentsInput } from './post-upsert-without-comments.input';
import { PostWhereUniqueInput } from './post-where-unique.input';
import { PostUpdateWithoutCommentsInput } from './post-update-without-comments.input';

@InputType()
export class PostUpdateOneRequiredWithoutCommentsNestedInput {

    @Field(() => PostCreateWithoutCommentsInput, {nullable:true})
    @Type(() => PostCreateWithoutCommentsInput)
    create?: PostCreateWithoutCommentsInput;

    @Field(() => PostCreateOrConnectWithoutCommentsInput, {nullable:true})
    @Type(() => PostCreateOrConnectWithoutCommentsInput)
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput;

    @Field(() => PostUpsertWithoutCommentsInput, {nullable:true})
    @Type(() => PostUpsertWithoutCommentsInput)
    upsert?: PostUpsertWithoutCommentsInput;

    @Field(() => PostWhereUniqueInput, {nullable:true})
    @Type(() => PostWhereUniqueInput)
    connect?: PostWhereUniqueInput;

    @Field(() => PostUpdateWithoutCommentsInput, {nullable:true})
    @Type(() => PostUpdateWithoutCommentsInput)
    update?: PostUpdateWithoutCommentsInput;
}
