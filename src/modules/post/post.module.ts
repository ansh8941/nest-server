import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
@Module({
  imports: [PrismaModule],
  providers: [PrismaService, PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
