import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeService } from './coffee.service';
import { CoffeeRepository } from './coffee.repository';
import { mockCoffee, mockCoffee1 } from '../../test-data/coffee.data'
import { NotFoundException } from '@nestjs/common';
import { mockShop } from 'test-data/shop.data';

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

  describe('getAllCoffee', () => {
    it('gets all coffee belonging to shop', async () => {
      coffeeRepository.find.mockResolvedValue([mockCoffee, mockCoffee1])
      expect(coffeeRepository.find).not.toHaveBeenCalled()
      const result = await coffeeService.getCoffee({ shopId: 44 })
      expect(coffeeRepository.find).toHaveBeenCalled()
      expect(result.length).toEqual(2)
    })
  })

  describe('getCoffeeById', () => {
    it('calls coffeeRepository.findOne and returns coffee', async () => {
      coffeeRepository.findOne.mockResolvedValue(mockCoffee)
      expect(coffeeRepository.findOne).not.toHaveBeenCalled()
      const result = await coffeeService.getCoffeeById({ coffeeId: 22, shopId: 44 })
      expect(coffeeRepository.findOne).toHaveBeenCalledWith({
        where: { id: 22, shopId: 44 }
      })
      expect(result).toEqual(mockCoffee)
      expect(result).not.toEqual(mockCoffee1)
    })
    it('throws an error if no coffee found', async () => {
      coffeeRepository.findOne.mockResolvedValue(undefined)
      expect(coffeeService.getCoffeeById({ coffeeId: 22, shopId: 44 })).rejects.toThrowError(NotFoundException)
    })
  })

  describe('createCoffee', () => {
    it('calls coffeeRepository.createCoffee and succesfully returns the coffee', async () => {
      coffeeRepository.createCoffee.mockResolvedValue(mockCoffee)
      expect(coffeeRepository.createCoffee).not.toHaveBeenCalled()
      const result = await coffeeService.createCoffee({ createCoffeeDto: mockCoffee, shopId: mockShop.id })
      expect(coffeeRepository.createCoffee).toHaveBeenCalledWith({ createCoffeeDto: mockCoffee, shopId: mockShop.id })
      expect(result).toEqual(mockCoffee)
    })
  })

  describe('deleteCoffee', () => {
    it('calls coffeeRepository.deleteCoffee to delete a coffee belonging to a shop', async () => {
      coffeeRepository.delete.mockResolvedValue({ affected: 1 })
      expect(coffeeRepository.delete).not.toHaveBeenCalled()
      await coffeeService.delete({ coffeeId: 22, shopId: 44 })
      expect(coffeeRepository.delete).toHaveBeenCalledWith({ id: 22, shopId: 44 })
    })
    it('throws and error if coffee could not be found', async () => {
      coffeeRepository.delete.mockResolvedValue({ affected: 0 })
      expect(coffeeService.delete({ coffeeId: 99, shopId: 44 })).rejects.toThrowError(NotFoundException)
    })
  })

  describe('updateCoffee', () => {
    it('updates coffee and returns coffee', async () => {
      const updatedCoffeeDto = {
        name: 'cappuccino',
        description: 'Espresso with airated milk.',
        origin: 'Costa Rica',
        type: 'cappuccino',
      }
      const coffee = mockCoffee
      const save = jest.fn().mockResolvedValue(true)
      coffeeService.getCoffeeById = jest.fn().mockResolvedValue({
        ...coffee,
        save,
      })

      expect(coffeeService.getCoffeeById).not.toHaveBeenCalled()
      expect(save).not.toHaveBeenCalled()
      const result = await coffeeService.updateCoffee({ coffeeId: 22, coffeeDto: mockCoffee, shopId: 44 })
      expect(coffeeService.getCoffeeById).toHaveBeenCalled()
      expect(save).toHaveBeenCalled()
      expect(result).toEqual(coffee)
    })
  })
});
