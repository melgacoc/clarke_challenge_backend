import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Review } from '../review/review.model';

@ObjectType()
@Table({
  tableName: 'suppliers',
  timestamps: false,
})
export class Supplier extends Model<Supplier> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Field()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Field({ nullable: true })
  @Column({
    type: DataType.TEXT,
  })
  logo: string;

  @Field()
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  state_origin: string;

  @Field(() => Float)
  @Column({
    type: DataType.DECIMAL(10, 4),
    allowNull: false,
  })
  cost_per_kWh: number;

  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  min_kWh_limit: number;

  @Field(() => Int, { defaultValue: 0 })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  total_clients: number;

  @Field(() => Float, { defaultValue: 0 })
  @Column({
    type: DataType.DECIMAL(3, 2),
    defaultValue: 0,
  })
  avg_rating: number;

  @Field(() => Review, { nullable: true })
  userReview?: Review;
}