import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';
import { Post } from './post.model';
import { CreatePostInput } from './dto';

import { BadRequestException, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';

@Resolver(() => Post)
export class PostResolver {
  constructor(private PostService: PostService) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.PostService.getAllPosts();
  }

  /* Mutation*/
  @Mutation(() => Post)
  public async createPost(@Args('data') data: CreatePostInput) {
    const post = await this.PostService.createOnePost(data);
    return post;
  }
}
