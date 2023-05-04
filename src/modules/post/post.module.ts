import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { UserService } from '@modules/user/services/user.service';
import { PasswordService } from '../auth/services/password.service';

@Module({
  imports: [PrismaModule],
  providers: [
    PrismaService,
    PasswordService,
    PostResolver,
    UserService,
    PostService,
  ],
})
export class PostModule {}
