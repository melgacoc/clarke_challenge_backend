import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.model';
import { CreateSupplierDto, UpdateSupplierDto, SupplierLoginDto } from './supplier.dto';
import { SupplierWithToken } from './supplier.schema';

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Query(() => [Supplier])
  async suppliers(
    @Args('minKwh', { type: () => Float, nullable: true }) minKwh: number = 0,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
    @Args('limit', { type: () => Int, nullable: true }) limit: number = 12,
    @Args('user_id', { type: () => String, nullable: true }) user_id: string,
  ): Promise<Supplier[]> {
    if (minKwh === 0) {
      return this.supplierService.findAll({ page, limit }, user_id);
    } else {
      return this.supplierService.findByMinKwh(minKwh, { page, limit }, user_id);
    }
  }

  @Query(() => Supplier)
  async getSupplierById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Supplier> {
    return this.supplierService.findById(id);
  }

  @Mutation(() => SupplierWithToken)
  async createSupplier(@Args('createSupplierDto') createSupplierDto: CreateSupplierDto): Promise<SupplierWithToken> {
    return this.supplierService.create(createSupplierDto);
  }

  @Mutation(() => Supplier)
  async updateSupplier(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateSupplierDto') updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    const [_, suppliers] = await this.supplierService.update(id, updateSupplierDto);
    return suppliers[0];
  }

  @Mutation(() => SupplierWithToken)
  async loginSupplier(@Args('supplierLoginDto') supplierLoginDto: SupplierLoginDto): Promise<SupplierWithToken> {
    return this.supplierService.login(supplierLoginDto);
  }
}