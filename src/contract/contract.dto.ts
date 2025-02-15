import { Field, Int, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class ContractDto {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  supplier_id!: number;

  @Field(() => String)
  user_id!: string;

  @Field()
  isActive!: boolean;

  @Field()
  cost_per_kWh!: number;

  @Field()
  user_kWh_month!: number;

  @Field()
  created_at!: Date;
}

@InputType()
export class CreateContractInput {
  @Field(() => Int)
  supplier_id!: number;

  @Field(() => String)
  user_id!: string;

  @Field()
  isActive!: boolean;

  @Field()
  user_kWh_month!: number;

  @Field({ nullable: true })
  cost_per_kWh: number;
}