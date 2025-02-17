import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import { Supplier } from './supplier.model';
import { ReviewModule } from '../review/review.module';
import { Review } from '../review/review.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Supplier]),
    SequelizeModule.forFeature([Review]),
  ],
  providers: [SupplierService, SupplierResolver],
})
export class SupplierModule {}