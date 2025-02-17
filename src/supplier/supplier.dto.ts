import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateSupplierDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  state_origin: string;

  @Field({ nullable: true })
  cost_per_kWh: number;

  @Field({ nullable: true })
  min_kWh_limit: number;

  @Field({ nullable: true })
  total_clients: number;

  @Field({ nullable: true })
  avg_rating: number;
}

@InputType()
export class UpdateSupplierDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  logo?: string;

  @Field({ nullable: true })
  state_origin?: string;

  @Field(() => Float, { nullable: true })
  cost_per_kWh?: number;

  @Field(() => Int, { nullable: true })
  min_kWh_limit?: number;

  @Field(() => Int, { nullable: true })
  total_clients?: number;

  @Field(() => Float, { nullable: true })
  avg_rating?: number;
}

@InputType()
export class SupplierLoginDto {
  @Field()
  email: string;

  @Field()
  password: string;
}