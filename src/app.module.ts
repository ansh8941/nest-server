import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/providers/prisma/prisma.module';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { UserModule } from '@modules/user/user.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { graphqlModuleFactory } from '@common/configs/graphql-module.factory';
import { AuthModule } from '@modules/auth/auth.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: graphqlModuleFactory,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    ProfileModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
