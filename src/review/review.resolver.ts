import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './review.model';
import { CreateReviewInput, UpdateReviewInput } from './review.dto';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => [Review], { name: 'getAllReviews' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Query(() => Review, { name: 'getReview' })
findOne(
  @Args('user_id', { type: () => String }) user_id: string,
  @Args('supplier_id', { type: () => String }) supplier_id: number
) {
  return this.reviewService.findOneByUserAndSupplier(user_id, supplier_id);
}

  @Mutation(() => Review)
  createReview(@Args('createReviewInput') createReviewInput: CreateReviewInput) {
    return this.reviewService.create(createReviewInput);
  }

  @Mutation(() => Review)
  removeReview(@Args('id', { type: () => String }) id: string) {
    return this.reviewService.remove(id);
  }
}