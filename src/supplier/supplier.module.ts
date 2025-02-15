import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import { Supplier } from './supplier.model';

@Module({
  imports: [SequelizeModule.forFeature([Supplier])],
  providers: [SupplierService, SupplierResolver],
})
export class SupplierModule {}