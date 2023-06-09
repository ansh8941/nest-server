import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';
import { Profile } from '../profile/profile.model';
import { Post } from '../post/post.model';
import { Comment } from '../comment/comment.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => Role, {nullable:false,defaultValue:'USER'})
    role!: keyof typeof Role;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => String, {nullable:true})
    currentHashedRefreshToken!: string | null;

    @Field(() => Profile, {nullable:true})
    profile?: Profile | null;

    @Field(() => [Post], {nullable:true})
    posts?: Array<Post>;

    @Field(() => [Comment], {nullable:true})
    Comment?: Array<Comment>;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}
