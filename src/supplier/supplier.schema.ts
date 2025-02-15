import { ObjectType, Field } from '@nestjs/graphql';
import { Supplier } from './supplier.model';

@ObjectType()
export class SupplierWithToken {
  @Field(() => Supplier)
  supplier: Supplier;

  @Field()
  token: string;
}