import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.model';
import { CreateSupplierDto, UpdateSupplierDto, SupplierLoginDto } from './supplier.dto';
import { SupplierWithToken } from './supplier.schema';

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Query(() => [Supplier])
  async suppliers(): Promise<Supplier[]> {
    return this.supplierService.findAll();
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