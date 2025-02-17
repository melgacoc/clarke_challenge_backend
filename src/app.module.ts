import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { Contract } from './contract/contract.model';
import { ContractModule } from './contract/contract.module';
import { Supplier } from './supplier/supplier.model';
import { SupplierModule } from './supplier/supplier.module';
import { Review } from './review/review.model';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'dpg-cupfioa3esus738de2n0-a.ohio-postgres.render.com',
      port: 5432,
      username: 'clarke_db_0z08_user',
      password: 'qZHi1XQEbz55DQVrN59mtLrUsVk5UFuC',
      database: 'clarke_db_0z08',
      models: [User, Contract, Supplier, Review],
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    UserModule,
    SupplierModule,
    ContractModule,
    ReviewModule,
  ],
})
export class AppModule {}
