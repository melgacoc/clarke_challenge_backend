import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class UserWithToken {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}