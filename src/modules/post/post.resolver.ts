import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.model';
import { CreatePostInput } from './dto';
import { CurrentUser } from '../user/decorators';

import { BadRequestException, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';
@Resolver(() => Post)
export class PostResolver {
  constructor(private PostService: PostService) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.PostService.getAllPosts();
  }

  @UseGuards(JwtGuard)
  /* Mutation*/
  @Mutation(() => Post)
  public async createPost(
    @CurrentUser() userId: string,
    @Args('data') data: CreatePostInput,
  ) {
    const post = await this.PostService.createOnePost(userId, data);
    return post;
  }
}
