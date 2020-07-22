import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeService } from './coffee.service';
import { CoffeeRepository } from './coffee.repository';

function mockCoffeeRepository() {
  return {
    find: jest.fn()
  }
}

describe('CoffeeService', () => {
  let coffeeService: CoffeeService;
  let coffeeRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeService,
        { provide: CoffeeRepository, useFactory: mockCoffeeRepository }
      ]
    }).compile();

    coffeeService = module.get<CoffeeService>(CoffeeService);
    coffeeRepository = module.get<CoffeeRepository>(CoffeeRepository)
  });

  it('should be defined', () => {
    expect(coffeeService).toBeDefined();
  });

  it.todo('getAllCoffee')

  it.todo('getCoffeeById')

  it.todo('createCoffee')

  it.todo('deleteCoffee')

  it.todo('updateCoffee')
});
