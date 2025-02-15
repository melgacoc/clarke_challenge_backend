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
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '1234',
      database: process.env.DB_NAME || 'graphql_db',
      models: [User, Contract, Supplier],
    }), 
    UserModule,
    SupplierModule,
    ContractModule,
  ],
})
export class AppModule {}