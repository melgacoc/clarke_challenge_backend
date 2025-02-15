import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Supplier } from './supplier.model';
import { CreateSupplierDto, UpdateSupplierDto, SupplierLoginDto } from './supplier.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier)
    private readonly supplierModel: typeof Supplier,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<{ supplier: Supplier; token: string }> {
    const hashedPassword = await bcrypt.hash(createSupplierDto.password, 10);
    const supplier = await this.supplierModel.create({
      ...createSupplierDto,
      password: hashedPassword,
    });
    const token = this.generateToken(supplier);
    return { supplier, token };
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<[number, Supplier[]]> {
    return this.supplierModel.update(updateSupplierDto, { where: { id }, returning: true });
  }

  async login(supplierLoginDto: SupplierLoginDto): Promise<{ supplier: Supplier; token: string }> {
    const supplier = await this.supplierModel.findOne({ where: { email: supplierLoginDto.email } });
    if (!supplier || !(await bcrypt.compare(supplierLoginDto.password, supplier.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.generateToken(supplier);
    return { supplier, token };
  }

  private generateToken(supplier: Supplier): string {
    return jwt.sign({ id: supplier.id, email: supplier.email }, 'secretKey', { expiresIn: '1h' });
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierModel.findAll();
  }
}