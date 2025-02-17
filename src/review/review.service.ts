import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './review.model';
import { Supplier } from '../supplier/supplier.model';
import { CreateReviewInput, UpdateReviewInput } from './review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review)
    private readonly reviewModel: typeof Review,
    @InjectModel(Supplier)
    private readonly supplierModel: typeof Supplier,
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

    let review: Review;
    if (existingReview) {
      existingReview.rating = rating;
      existingReview.updatedAt = new Date();
      review = await existingReview.save();
    } else {
      review = await this.reviewModel.create(createReviewInput);
    }

    const reviews = await this.reviewModel.findAll({
      where: { supplier_id },
    });

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    await this.supplierModel.update(
      { avg_rating: averageRating },
      { where: { id: supplier_id } }
    );

    return review;
}

  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    await review.destroy();
  }

  async findOneByUserAndSupplier(user_id: string, supplier_id: number): Promise<Review> {
    return this.reviewModel.findOne({ where: { user_id, supplier_id } });
  }
}