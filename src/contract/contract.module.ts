import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract } from './contract.model';
import { Supplier } from '../supplier/supplier.model';
import { User } from '../user/user.model';
import { ContractService } from './contract.service';
import { ContractResolver } from './contract.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Contract, Supplier, User])],
  providers: [ContractService, ContractResolver],
})
export class ContractModule {}