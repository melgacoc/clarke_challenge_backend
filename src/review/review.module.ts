import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { Review } from './review.model';

@Module({
  imports: [SequelizeModule.forFeature([Review])],
  providers: [ReviewService, ReviewResolver],
  exports: [ReviewService],
})
export class ReviewModule {}