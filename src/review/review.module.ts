import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { Review } from './review.model';
import { Supplier } from '../supplier/supplier.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Review]),
    SequelizeModule.forFeature([Supplier]),
],
  providers: [ReviewService, ReviewResolver],
  exports: [ReviewService],
})
export class ReviewModule {}