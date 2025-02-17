import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import { User } from '../src/user/user.model';
import { Supplier } from '../src/supplier/supplier.model';
import { Contract } from '../src/contract/contract.model';
import { Review } from '../src/review/review.model';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'postgres' as Dialect,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'graphql_db',
  logging: false,
  models: [User, Supplier, Contract, Review],
});