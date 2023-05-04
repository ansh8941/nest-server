import { PrismaService } from 'src/providers/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePostInput } from './dto';
import { Post } from './post.model';

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  public async getAllPosts(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  /* Mutations*/
  public async createOnePost(
    userId: string,
    data: CreatePostInput,
  ): Promise<Post> {
    return this.prisma.post.create({ data: { authorId: userId, ...data } });
  }
}
