import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Supplier } from './supplier.model';
import { CreateSupplierDto, UpdateSupplierDto, SupplierLoginDto } from './supplier.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { Review } from '../review/review.model';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier)
    private readonly supplierModel: typeof Supplier,
    @InjectModel(Review)
    private readonly reviewModel: typeof Review,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<{ supplier: Supplier; token: string }> {
    const hashedPassword = await bcrypt.hash(createSupplierDto.password, 10);
    const supplier = await this.supplierModel.create({
      name: createSupplierDto.name,
      email: createSupplierDto.email,
      password: hashedPassword,
      logo: createSupplierDto.logo ?? null,
      state_origin: createSupplierDto.state_origin ?? null,
      cost_per_kWh: createSupplierDto.cost_per_kWh ?? null,
      min_kWh_limit: createSupplierDto.min_kWh_limit ?? null,
      total_clients: createSupplierDto.total_clients ?? 0,
      avg_rating: createSupplierDto.avg_rating ?? 0,
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

  async findAll({ page, limit }, user_id: string): Promise<Supplier[]> {
    const offset = (page - 1) * limit;
    const suppliers = await this.supplierModel.findAll({ offset, limit });

    for (const supplier of suppliers) {
      const review = await this.reviewModel.findOne({ where: { supplier_id: supplier.id, user_id: user_id  } });
      console.log(review);
      supplier.userReview = review;
    }

    return suppliers;
  }

  async findByMinKwh(minKwh: number, { page, limit }, user_id: string): Promise<Supplier[]> {
    const offset = (page - 1) * limit;
    const suppliers = await this.supplierModel.findAll({ where: { min_kWh_limit: { [Op.lt]: minKwh } }, offset, limit });

    for (const supplier of suppliers) {
      const review = await this.reviewModel.findOne({ where: { user_id: user_id, supplier_id: supplier.id } });
      supplier.userReview = review;
    }

    return suppliers;
  }

  async findById(id: number): Promise<Supplier> {
    return this.supplierModel.findByPk(id);
  }
}