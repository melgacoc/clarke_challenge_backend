import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './review.model';
import { CreateReviewInput, UpdateReviewInput } from './review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review)
    private readonly reviewModel: typeof Review,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewModel.findAll();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel.findByPk(id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }

  async create(createReviewInput: CreateReviewInput): Promise<Review> {
    const { user_id, supplier_id, rating } = createReviewInput;
    const existingReview = await this.reviewModel.findOne({
      where: { user_id, supplier_id },
    });

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.updatedAt = new Date();
      return existingReview.save();
    } else {
      return this.reviewModel.create(createReviewInput);
    }
  }

  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    await review.destroy();
  }
}