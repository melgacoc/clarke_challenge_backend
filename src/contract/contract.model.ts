import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Supplier } from '../supplier/supplier.model';

@ObjectType()
@Table
export class Contract extends Model<Contract> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Field(() => Int)
  @ForeignKey(() => Supplier)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  supplier_id!: number;

  @Field(() => Supplier)
  @BelongsTo(() => Supplier)
  supplier!: Supplier;

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  user_id!: number;

  @Field(() => User)
  @BelongsTo(() => User)
  user!: User;

  @Field()
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean;
}