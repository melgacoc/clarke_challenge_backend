import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../src/user/user.model';
import { Supplier } from '../src/supplier/supplier.model';
import { Contract } from '../src/contract/contract.model';
import { Review } from '../src/review/review.model';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: 'dpg-cupfioa3esus738de2n0-a.ohio-postgres.render.com',
  port: 5432,
  username: 'clarke_db_0z08_user',
  password: 'qZHi1XQEbz55DQVrN59mtLrUsVk5UFuC',
  database: 'clarke_db_0z08',
  models: [User, Supplier, Contract, Review],
  autoLoadModels: true,
  synchronize: false,
};
