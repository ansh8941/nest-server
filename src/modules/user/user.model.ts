import { BaseModel } from '@common/abstract-model/base.model';

import {
  ObjectType,
  Field,
  HideField,
  registerEnumType,
} from '@nestjs/graphql';

import { Role } from './user.types';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});
@ObjectType('user')
export class User extends BaseModel {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { defaultValue: Role.USER })
  role: string;

  @HideField()
  password: string;

  @HideField()
  currentHashedRefreshToken?: string;
}
