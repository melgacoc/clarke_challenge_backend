import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserWithToken } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserWithToken> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new User({ ...createUserDto, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
    return { user, token };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserWithToken> {
    const user = await this.userModel.findOne({ where: { email: loginUserDto.email } });
    if (user && await bcrypt.compare(loginUserDto.password, user.password)) {
      const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
      return { user, token };
    }
    throw new Error('Invalid credentials');
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(updateUserDto.id);
    if (!user) {
      throw new Error('User not found');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return user.update(updateUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}