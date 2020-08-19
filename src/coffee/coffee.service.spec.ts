import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { CoffeeService } from './coffee.service'
import { CoffeeRepository } from './coffee.repository'
import { mockCoffee, mockCoffee1 } from '../../test-data/coffee.data'
import { mockShop } from '../../test-data/shop.data'
import { ShopRepository } from '../shop/shop.repository';

function mockCoffeeRepository() {
  return {
    find: jest.fn(),
    findOne: jest.fn(),
    createCoffee: jest.fn(),
  }
}

function mockShopRepository() {
  return {
    findOne: jest.fn()
  }
}

describe('CoffeeService', () => {
  let coffeeService: CoffeeService
  let coffeeRepository
  let shopRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeService,
        { provide: CoffeeRepository, useFactory: mockCoffeeRepository },
        { provide: ShopRepository, useFactory: mockShopRepository },
      ]
    }).compile()

    coffeeService = module.get<CoffeeService>(CoffeeService)
    coffeeRepository = module.get<CoffeeRepository>(CoffeeRepository)
    shopRepository = module.get<ShopRepository>(ShopRepository)
  })

  it('should be defined', () => {
    expect(coffeeService).toBeDefined()
  })

  describe('getCoffeeByShopId', () => {
    it('gets all coffee belonging to shop', async () => {
      coffeeRepository.find.mockResolvedValue([mockCoffee, mockCoffee1])

      expect(coffeeRepository.find).not.toHaveBeenCalled()
      const result = await coffeeService.getCoffeeByShopId('f3eddab7-143f-47b5-a5ac-b3ea848389b2')
      expect(coffeeRepository.find).toHaveBeenCalled()
      expect(result.length).toEqual(2)
    })
  })

  describe('getCoffeeById', () => {
    it('calls coffeeRepository.findOne and returns coffee', async () => {
      coffeeRepository.findOne.mockResolvedValue(mockCoffee)
      expect(coffeeRepository.findOne).not.toHaveBeenCalled()
      const result = await coffeeService.getCoffeeById('f3eddab7-143f-47b5-a5ac-b3ea848389b2')
      expect(coffeeRepository.findOne).toHaveBeenCalled()
      expect(result).toEqual(mockCoffee)
      expect(result).not.toEqual(mockCoffee1)
    })
    it('throws an error if no coffee found', async () => {
      coffeeRepository.findOne.mockResolvedValue(undefined)
      expect(coffeeService.getCoffeeById('ffffff')).rejects.toThrowError(NotFoundException)
    })
  })

  describe('createCoffee', () => {
    it('calls coffeeRepository.createCoffee and succesfully returns the coffee', async () => {
      coffeeRepository.createCoffee.mockResolvedValue(mockCoffee)
      shopRepository.findOne.mockResolvedValue(mockShop)

      expect(coffeeRepository.createCoffee).not.toHaveBeenCalled()
      const result = await coffeeService.createCoffee(mockCoffee, 'asdfasdfds-78787')
      expect(coffeeRepository.createCoffee).toHaveBeenCalledWith(mockCoffee, mockShop)
      expect(result).toEqual(mockCoffee)
    })
  })

  // describe('deleteCoffee', () => {
  //   it('calls coffeeRepository.deleteCoffee to delete a coffee belonging to a shop', async () => {
  //     coffeeRepository.delete.mockResolvedValue({ affected: 1 })
  //     expect(coffeeRepository.delete).not.toHaveBeenCalled()
  //     await coffeeService.delete({ coffeeId: 22, shopId: 44 })
  //     expect(coffeeRepository.delete).toHaveBeenCalledWith({ id: 22, shopId: 44 })
  //   })
  //   it('throws and error if coffee could not be found', async () => {
  //     coffeeRepository.delete.mockResolvedValue({ affected: 0 })
  //     expect(coffeeService.delete({ coffeeId: 99, shopId: 44 })).rejects.toThrowError(NotFoundException)
  //   })
  // })

  // describe('updateCoffee', () => {
  //   it('updates coffee and returns coffee', async () => {
  //     const updatedCoffeeDto = {
  //       name: 'cappuccino',
  //       description: 'Espresso with airated milk.',
  //       origin: 'Costa Rica',
  //       type: 'cappuccino',
  //     }
  //     const coffee = mockCoffee
  //     const save = jest.fn().mockResolvedValue(true)
  //     coffeeService.getCoffeeById = jest.fn().mockResolvedValue({
  //       ...coffee,
  //       save,
  //     })

  //     expect(coffeeService.getCoffeeById).not.toHaveBeenCalled()
  //     expect(save).not.toHaveBeenCalled()
  //     const result = await coffeeService.updateCoffee({ coffeeId: 22, coffeeDto: mockCoffee, shopId: 44 })
  //     expect(coffeeService.getCoffeeById).toHaveBeenCalled()
  //     expect(save).toHaveBeenCalled()
  //     expect(result).toEqual(coffee)
  //   })
  // })
})
