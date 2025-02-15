import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  cpf: string;

  @Field()
  password: string;
}

@InputType()
export class LoginUserDto {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  cpf?: string;

  @Field({ nullable: true })
  password?: string;
}