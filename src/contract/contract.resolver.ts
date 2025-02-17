import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContractService } from './contract.service';
import { Contract } from './contract.model';
import { ContractDto, CreateContractInput } from './contract.dto';

@Resolver(() => ContractDto)
export class ContractResolver {
  constructor(private readonly contractService: ContractService) {}

  @Query(() => [ContractDto], { name: 'getAllContracts' })
  async getAllContracts(): Promise<Contract[]> {
    return this.contractService.findAll();
  }

  @Query(() => [ContractDto], { name: 'getAllContractsByUserId' })
  async getAllContractsByUserId(
    @Args('user_id', { type: () => String }) user_id: string,
  ): Promise<ContractDto[]> {
    return this.contractService.findAllByUserId(user_id);
  }

  @Query(() => [ContractDto], { name: 'getAllContractsBySupplierId' })
  async getAllContractsBySupplierId(
    @Args('supplier_id', { type: () => Int }) supplier_id: number,
    @Args('page', { type: () => Int, nullable: true }) page: number = 1,
    @Args('limit', { type: () => Int, nullable: true }) limit: number = 10,
  ): Promise<ContractDto[]> {
    return this.contractService.findAllBySupplierId(supplier_id, { page, limit });
  }

  @Mutation(() => ContractDto)
  async createContract(
    @Args('createContractInput') createContractInput: CreateContractInput,
  ): Promise<Contract> {
    return this.contractService.create(createContractInput);
  }

  @Mutation(() => ContractDto)
  async deactivateContract(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Contract> {
    return this.contractService.deactivate(id);
  }
}