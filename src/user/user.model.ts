import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Table, Column, Model, DataType, HasOne, Default } from 'sequelize-typescript';
import { Contract } from '../contract/contract.model';

@ObjectType()
@Table({
  tableName: 'user',
  timestamps: false,
})
export class User extends Model<User> {
  @Field(()=> String)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    autoIncrement: true,
  })
  id: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cpf: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Field(() => Contract, { nullable: true })
  @HasOne(() => Contract)
  contract: Contract;
}