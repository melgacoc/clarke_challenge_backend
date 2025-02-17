import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Supplier } from '../supplier/supplier.model';
import { User } from '../user/user.model';

@ObjectType()
@Table({
  tableName: 'contracts',
  timestamps: false,
})
export class Contract extends Model<Contract> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Field(() => Supplier)
  @BelongsTo(() => Supplier)
  supplier!: Supplier;

  @Field(() => Int)
  @ForeignKey(() => Supplier)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  supplier_id!: number;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  supplier_name!: string;

  @Field(() => String)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id!: string;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  user_name!: string;

  @Field(() => User)
  @BelongsTo(() => User)
  user!: User;

  @Field()
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean;

  @Field()
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  cost_per_kWh!: number;

  @Field()
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  })
  user_kWh_month!: number;

  @Field()
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_at!: Date;
}