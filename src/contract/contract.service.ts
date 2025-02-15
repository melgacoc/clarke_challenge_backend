import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contract } from './contract.model';
import { CreateContractInput, ContractDto } from './contract.dto';
import { Supplier } from '../supplier/supplier.model';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel(Contract)
    private readonly contractModel: typeof Contract,
    @InjectModel(Supplier)
    private readonly supplierModel: typeof Supplier,
  ) {}

  async findAll(): Promise<Contract[]> {
    return this.contractModel.findAll();
  }

  async findAllByUserId(user_id: string): Promise<ContractDto[]> {
    return this.contractModel.findAll({ where: { user_id } });
  }

  async findAllBySupplierId(supplier_id: number): Promise<ContractDto[]> {
    return this.contractModel.findAll({ where: { supplier_id } });}

  async create(createContractInput: CreateContractInput): Promise<Contract> {
    const supplier = await this.supplierModel.findByPk(createContractInput.supplier_id);
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    if (createContractInput.user_kWh_month <= supplier.min_kWh_limit) {
      throw new BadRequestException('Monthly consumption must be greater than the supplier limit');
    }
    const contractCount = await this.contractModel.count({
      where: { supplier_id: createContractInput.supplier_id },
    });
    if (contractCount >= supplier.total_clients) {
      throw new BadRequestException('Supplier has reached the maximum number of contracts');
    }

    createContractInput.cost_per_kWh = supplier.cost_per_kWh;
    createContractInput.isActive = true;

    return this.contractModel.create(createContractInput);
  }

  async deactivate(id: number): Promise<Contract> {
    const contract = await this.contractModel.findByPk(id);
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }
    contract.isActive = false;
    await contract.save();
    return contract;
  }
}