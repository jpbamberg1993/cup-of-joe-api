import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeService } from './coffee.service';

describe('CoffeeService', () => {
  let service: CoffeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeService],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('getAllCoffee')

  it.todo('getCoffeeById')

  it.todo('createCoffee')

  it.todo('deleteCoffee')

  it.todo('updateCoffee')
});
