import { Test, TestingModule } from '@nestjs/testing';
import { SupplierResolver } from '../src/supplier/supplier.resolver';
import { SupplierService } from '../src/supplier/supplier.service';
import { CreateSupplierDto, SupplierLoginDto } from '../src/supplier/supplier.dto';
import { SupplierWithToken } from '../src/supplier/supplier.schema';
import { Supplier } from '../src/supplier/supplier.model';
import * as jwt from 'jsonwebtoken';

jest.mock('../src/supplier/supplier.model', () => {
    return {
      Supplier: jest.fn().mockImplementation((supplier) => ({
        ...supplier,
        save: jest.fn(),
      })),
    };
  });
  
  describe('SupplierResolver', () => {
    let resolver: SupplierResolver;
    let supplierService: SupplierService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          SupplierResolver,
          {
            provide: SupplierService,
            useValue: {
              create: jest.fn(),
              login: jest.fn(),
            },
          },
        ],
      }).compile();
  
      resolver = module.get<SupplierResolver>(SupplierResolver);
      supplierService = module.get<SupplierService>(SupplierService);
    });
  
    describe('createSupplier', () => {
      it('should create a new supplier', async () => {
        const createSupplierDto: CreateSupplierDto = {
          name: 'Cemig',
          email: 'cemig@email.com',
          password: 'password123',
          logo: 'hhtp://logo.com',
          state_origin: 'MG',
          cost_per_kWh: 0.12,
          min_kWh_limit: 100,
          total_clients: 10,
          avg_rating: 4.5,
        };
  
        const supplier = new Supplier({
          id: 1,
          ...createSupplierDto,
        });
  
        const token = jwt.sign({Id: supplier.id }, 'secretKey', { expiresIn: '1h' });
        const result: SupplierWithToken = {
          supplier,
          token: token,
        };
  
        jest.spyOn(supplierService, 'create').mockResolvedValue(result);
  
        expect(await resolver.createSupplier(createSupplierDto)).toEqual(result);
        expect(supplierService.create).toHaveBeenCalledWith(createSupplierDto);
      });
  
      it('should throw an error if an email already exists', async () => {
        const createSupplierDto: CreateSupplierDto = {
            name: 'Cemig',
            email: 'cemig@email.com',
            password: 'password123',
            logo: 'hhtp://logo.com',
            state_origin: 'MG',
            cost_per_kWh: 0.12,
            min_kWh_limit: 100,
            total_clients: 10,
            avg_rating: 4.5,
        };
  
        jest.spyOn(supplierService, 'create').mockImplementation(() => {
          throw new Error('Supplier with this email already exists');
        });
  
        await expect(resolver.createSupplier(createSupplierDto)).rejects.toThrow('Supplier with this email already exists');
        expect(supplierService.create).toHaveBeenCalledWith(createSupplierDto);
      });
    });
  
    describe('loginSupplier', () => {
      it('should login a supplier', async () => {
        const supplierLoginDto: SupplierLoginDto = {
          email: 'cemig@email.com',
          password: 'password123',
        };
  
        const supplier = new Supplier({
          id: 1,
          name: 'Supplier Test',
          email: 'cemig@email.com',
          password: 'password123',
          logo: 'hhtp://logo.com',
          state_origin: 'MG',
          cost_per_kWh: 0.12,
          min_kWh_limit: 100,
          total_clients: 10,
          avg_rating: 4.5,
        });
  
        const token = jwt.sign({Id: supplier.id }, 'secretKey', { expiresIn: '1h' });
        const result: SupplierWithToken = {
          supplier,
          token: token,
        };
  
        jest.spyOn(supplierService, 'login').mockResolvedValue(result);
  
        expect(await resolver.loginSupplier(supplierLoginDto)).toEqual(result);
        expect(supplierService.login).toHaveBeenCalledWith(supplierLoginDto);
      });
  
      it('should throw an error if credentials are incorrect', async () => {
        const supplierLoginDto: SupplierLoginDto = {
          email: 'cemig@email.com',
          password: 'password1234',
        };
  
        jest.spyOn(supplierService, 'login').mockImplementation(() => {
          throw new Error('Invalid credentials');
        });
  
        await expect(resolver.loginSupplier(supplierLoginDto)).rejects.toThrow('Invalid credentials');
        expect(supplierService.login).toHaveBeenCalledWith(supplierLoginDto);
      });
    });
  });