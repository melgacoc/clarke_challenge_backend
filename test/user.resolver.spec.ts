import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '../src/user/user.resolver';
import { UserService } from '../src/user/user.service';
import { CreateUserDto, LoginUserDto } from '../src/user/user.dto';
import { UserWithToken } from '../src/user/user.schema';
import { User } from '../src/user/user.model';
import * as jwt from 'jsonwebtoken';

jest.mock('../src/user/user.model', () => {
  return {
    User: jest.fn().mockImplementation((user) => ({
      ...user,
      save: jest.fn(),
    })),
  };
});

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user and return UserWithToken', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Cláudio Melgaço',
        email: 'claudio.test@email.com',
        cpf: '12345678900',
        password: 'password123',
      };
      const user: User = new User({
        id: '1',
        name: 'Cláudio Melgaço',
        email: 'claudio.test@email.com',
        cpf: '12345678900',
        password: 'password123',
        contract: null,
      });
      const token = jwt.sign({Id: user.id }, 'secretKey', { expiresIn: '1h' });
      const result: UserWithToken = {
        user,
        token,
      };

      jest.spyOn(userService, 'create').mockResolvedValue(result);

      expect(await resolver.createUser(createUserDto)).toEqual(result);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw an error if an user with that email already exists', async () => {
        const createUserDto: CreateUserDto = {
            name: 'Cláudio Júnior',
            email: 'claudio.test@email.com',
            cpf: '12345678900',
            password: 'password123',
        };
    
        jest.spyOn(userService, 'create').mockImplementation(() => {
            throw new Error('User with this email already exists');
        });
    
        await expect(resolver.createUser(createUserDto)).rejects.toThrow('User with this email already exists');
        expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
    
  });

  describe('loginUser', () => {
    it('should login a user and return UserWithToken', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'claudio.test@email.com',
        password: 'password123',
      };
      const user: User = new User({
        id: '1',
        name: 'Cláudio Melgaço',
        email: 'claudio.test@email.com',
        cpf: '12345678900',
        password: 'password123',
        contract: null,
      });
      const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
      const result: UserWithToken = {
        user,
        token,
      };

      jest.spyOn(userService, 'login').mockResolvedValue(result);

      expect(await resolver.loginUser(loginUserDto)).toEqual(result);
      expect(userService.login).toHaveBeenCalledWith(loginUserDto);
    });

    it('should throw an error if login fails', async () => {
      const loginUserDto: LoginUserDto = {
        email: 'claudio.test@email.com',
        password: 'password1234',
      };
        const error = new Error('Invalid credentials');
        jest.spyOn(userService, 'login').mockRejectedValue(error);
        
        try {
          await resolver.loginUser(loginUserDto);
        } catch (error) {
          expect(error).toEqual(error);
        }

        expect(userService.login).toHaveBeenCalledWith(loginUserDto);
    });
  });
});