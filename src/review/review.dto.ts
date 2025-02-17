import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field()
  user_id: string;

  @Field()
  supplier_id: number;

  @Field()
  rating: number;
}

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  @Field()
  id: string;
}