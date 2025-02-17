import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Supplier } from '../supplier/supplier.model';

@ObjectType()
@Table({
  tableName: 'reviews',
  timestamps: true,
})
export class Review extends Model<Review> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field()
  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_id: string;

  @Field()
  @ForeignKey(() => Supplier)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  supplier_id: number;

  @Field(() => Float)
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  })
  rating: number;

  @Field(() => Date)
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Field(() => Date)
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @Field(() => User)
  @BelongsTo(() => User)
  user: User;

  @Field(() => Supplier)
  @BelongsTo(() => Supplier)
  supplier: Supplier;
}