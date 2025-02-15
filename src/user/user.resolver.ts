import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { UserWithToken } from './user.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(() => UserWithToken)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<UserWithToken> {
    return this.userService.create(createUserDto);
  }

  @Mutation(() => UserWithToken)
  async loginUser(@Args('loginUserDto') loginUserDto: LoginUserDto): Promise<UserWithToken> {
    return this.userService.login(loginUserDto);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(updateUserDto);
  }
}