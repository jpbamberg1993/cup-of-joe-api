import { Test } from '@nestjs/testing';
import { ShopService } from './shop.service';
import { ShopRepository } from './shop.repository';
import { NotFoundException } from '@nestjs/common';

const mockShop = {
  name: 'coffee district',
  streetOne: '325 ne 2nd ave',
  streetTwo: '104',
  city: 'delray beach',
  state: 'florida',
  zip: '33444',
  dateVisited: new Date(),
  description: `Sorta cool layout, weird painting I can't figure out`,
}

const mockShop1 = {
  name: 'yaxche teahouse',
  streetOne: '14 S Swinton Ave',
  streetTwo: '',
  city: 'delray beach',
  state: 'florida',
  zip: '33444',
  dateVisited: new Date(),
  description: `It's a really cool place with an awesome vibe but the tea is a bit overpriced`,
}

const mockUpdatedShopData = {
  name: 'the coffee district',
  streetOne: '123 bambam st',
  streetTwo: '222',
  city: 'boynton beach',
  state: 'florida',
  zip: '33444',
  dateVisited: new Date(),
  description: `Sorta cool layout, weird painting I can't figure out.`,
}

function mockShopRepository() {
  return {
    createShop: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
    findOne: jest.fn()
  }
}

describe('ShopService', function() {
  let shopService: ShopService
  let shopRepository 

  beforeEach(async function() {
    const module = await Test.createTestingModule({
      providers: [
        ShopService,
        { provide: ShopRepository, useFactory: mockShopRepository }
      ]
    })
    .compile()
    shopService = module.get<ShopService>(ShopService)
    shopRepository = module.get<ShopRepository>(ShopRepository)
  })

  describe('createShop', function() {
    it('calls shopRepository.createShop and successfully returns shop', async function() {
      shopRepository.createShop.mockResolvedValue(mockShop)
      expect(shopRepository.createShop).not.toHaveBeenCalled()
      const result = await shopService.createShop(mockShop)
      expect(shopRepository.createShop).toHaveBeenCalled()
      expect(result).toEqual(mockShop)
    })
  })

  describe('deleteShop', function() {
    it('calls shopRepository.delete to delete a task', async function() {
      shopRepository.delete.mockResolvedValue({ affected: 1 })
      expect(shopRepository.delete).not.toHaveBeenCalled()
      await shopService.deleteShop(3)
      expect(shopRepository.delete).toHaveBeenCalledWith(3)
    })
    it('throws an error if shop could not be found', async function() {
      shopRepository.delete.mockResolvedValue({ affected: 0 })
      expect(shopService.deleteShop(6)).rejects.toThrowError(NotFoundException)
    })
  })

  describe('updateShop', function() {
    it('updates shop name and returns shop', async function() {
      const shop = mockShop
      const save = jest.fn().mockResolvedValue(true)
      shopService.getShopById = jest.fn().mockResolvedValue({
        ...shop,
        save
      })

      expect(shopService.getShopById).not.toHaveBeenCalled()
      expect(save).not.toHaveBeenCalled()
      const result = await shopService.updateShop(2, mockUpdatedShopData)
      expect(shopService.getShopById).toHaveBeenCalled()
      expect(save).toHaveBeenCalled()
      expect(result.name).toEqual('the coffee district')
    })
    it('updates shop address and returns shop', async function() {
      const shop = mockShop
      const save = jest.fn().mockResolvedValue(true)
      shopService.getShopById = jest.fn().mockResolvedValue({
        ...shop,
        save
      })

      expect(shopService.getShopById).not.toHaveBeenCalled()
      expect(save).not.toHaveBeenCalled()
      const result = await shopService.updateShop(2, mockUpdatedShopData)
      expect(shopService.getShopById).toHaveBeenCalled()
      expect(save).toHaveBeenCalled()
      expect(result.streetOne).toEqual(mockUpdatedShopData.streetOne)
    })
    it('updates description and returns shop', async function() {
      const shop = mockShop
      const save = jest.fn().mockResolvedValue(true)
      shopService.getShopById = jest.fn().mockResolvedValue({
        ...shop,
        save
      })

      expect(shopService.getShopById).not.toHaveBeenCalled()
      expect(save).not.toHaveBeenCalled()
      const result = await shopService.updateShop(2, mockUpdatedShopData)
      expect(result.description).toEqual(mockUpdatedShopData.description)
    })
  })

  describe('getShops', function() {
    it('gets all shops from repository', async function() {
      shopRepository.find.mockResolvedValue([mockShop, mockShop1])
      expect(shopRepository.find).not.toHaveBeenCalled()
      const result = await shopService.getShops()
      expect(shopRepository.find).toHaveBeenCalled()
      expect(result.length).toEqual(2)
    })
    it('returns empty array if no shops found', async function() {
      shopRepository.find.mockResolvedValue([])
      expect(shopRepository.find).not.toHaveBeenCalled()
      const result = await shopService.getShops()
      expect(shopRepository.find).toHaveBeenCalled()
      expect(result.length).toEqual(0)
    })
  })

  describe('getShopById', function() {
    it('calls shopRepository.findOne and succesfully returns the shop', async function() {
      shopRepository.findOne.mockResolvedValue(mockShop)
      expect(shopRepository.findOne).not.toHaveBeenCalled()
      const result = await shopService.getShopById(2)
      expect(shopRepository.findOne).toHaveBeenCalledWith(2)
      expect(result).toEqual(mockShop)
    })
  })
})
