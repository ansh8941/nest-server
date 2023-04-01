import { PrismaService } from 'src/providers/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ChangePasswordInput } from '../dto/change-password.input';
import { PasswordService } from '../../auth/services/password.service';
import { UpdateUserInput } from '../dto';
import { User } from '../user.model';
import { FindFirstUserArgs } from '@common/@generated/user/find-first-user.args';
import { FindManyUserArgs } from '@common/@generated/user/find-many-user.args';

import { UserWhereInput } from '@common/@generated/user/user-where.input';
import { UserWhereUniqueInput } from '@common/@generated/user/user-where-unique.input';

import { CreateUserInput } from '../dto/create-user.input';
import { GraphQLResolveInfo } from 'graphql';
import { PrismaSelectService } from 'src/providers/prisma/prisma-select.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private prismaSelectService: PrismaSelectService,
  ) {}

  /* Queries */
  public async getUserByUniqueInput(
    where: UserWhereUniqueInput,
    info?: GraphQLResolveInfo,
  ): Promise<User> {
    const select = this.prismaSelectService.getValue(info);

    return await this.prisma.user.findUnique({
      ...select,
      where,
    });
  }

  public async getFirstUser(
    args: FindFirstUserArgs,
    info?: GraphQLResolveInfo,
  ): Promise<User> {
    const select = this.prismaSelectService.getValue(info);
    return await this.prisma.user.findFirst({ ...args, ...select });
  }

  public async getManyUsers(
    args: FindManyUserArgs,
    info?: GraphQLResolveInfo,
  ): Promise<User[]> {
    const select = this.prismaSelectService.getValue(info);
    return await this.prisma.user.findMany({ ...args, ...select });
  }

  public async countManyUsers(args: FindManyUserArgs): Promise<number> {
    return await this.prisma.user.count({ ...args });
  }

  /* Mutations*/
  public async createOneUser(data: CreateUserInput): Promise<User> {
    // Validation already checked with @Validate of class-validator
    const hashedPassword = await this.passwordService.hashPassword(
      data.password,
    );
    try {
      return await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          throw new BadRequestException('The User is already exists.');
        }
      }
      throw e;
    }
  }

  /**
   * Upsert user for admin to avoid error when email already exists
   *
   * @param   {CreateUserInput<User>}  data  [data description]
   *
   * @return  {Promise<User>}                [return description]
   */
  public async upsertOneUser(data: CreateUserInput): Promise<User> {
    // If create user
    const hashedPassword = await this.passwordService.hashPassword(
      data.password,
    );
    return await this.prisma.user.upsert({
      where: { email: data.email },
      create: { ...data, password: hashedPassword },
      update: {},
    });
  }

  public async updateOneUser(
    where: UserWhereUniqueInput,
    data: UpdateUserInput,
  ): Promise<User> {
    try {
      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      throw error;
    }
  }

  // /**
  //  * [async description]
  //  *
  //  * @return  {[type]}  [return description]
  //  */
  // public async updateManyUsers(
  //   where: UserWhereInput,
  //   data: UpdateUserInput,
  // ): Promise<BatchPayload> {
  //   try {
  //     return await this.prisma.user.updateMany({
  //       where,
  //       data,
  //     });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  public async deleteOneUser(where: UserWhereUniqueInput): Promise<User> {
    try {
      return await this.prisma.user.delete({ where });
    } catch (error) {
      throw error;
    }
  }

  // public async deleteManyUsers(where: UserWhereInput): Promise<BatchPayload> {
  //   try {
  //     return await this.prisma.user.deleteMany({ where });
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  public async changePassword(
    userId: string,
    userPassword: string,
    changePasswordInput: ChangePasswordInput,
  ) {
    try {
      const { newPassword, oldPassword } = changePasswordInput;
      const passwordValid = await this.passwordService.validatePassword(
        oldPassword,
        userPassword,
      );

      if (!passwordValid) {
        throw new BadRequestException('Invalid password');
      }
      const hashedPassword = await this.passwordService.hashPassword(
        newPassword,
      );
      return await this.prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
