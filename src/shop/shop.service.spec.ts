import { Test } from '@nestjs/testing';
import { ShopService } from './shop.service';
import { ShopRepository } from './shop.repository';
import { NotFoundException } from '@nestjs/common';
import { mockShop, mockShop1, mockUpdatedShopData } from '../../sample-data/shop.data'

function mockShopRepository() {
  return {
    createShop: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
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
      const result = await shopService.getShopById('asdfse78787')
      expect(shopRepository.findOne).toHaveBeenCalledWith('asdfse78787')
      expect(result).toEqual(mockShop)
    })
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
      await shopService.deleteShop('asdfse78787')
      expect(shopRepository.delete).toHaveBeenCalledWith('asdfse78787')
    })
    it('throws an error if shop could not be found', async function() {
      shopRepository.delete.mockResolvedValue({ affected: 0 })
      expect(shopService.deleteShop('asdfse78787')).rejects.toThrowError(NotFoundException)
    })
  })

  describe('updateShop', function() {
    let save 
    beforeEach(async function() {
      const shop = mockShop
      save = jest.fn().mockResolvedValue(true)
      shopService.getShopById = jest.fn().mockResolvedValue({
        ...shop,
        save
      })
    })

    it('updates shop name and returns shop', async function() {
      expect(shopService.getShopById).not.toHaveBeenCalled()
      expect(save).not.toHaveBeenCalled()
      const result = await shopService.updateShop('asdfse78787', mockUpdatedShopData)
      expect(shopService.getShopById).toHaveBeenCalled()
      expect(save).toHaveBeenCalled()
      expect(result.name).toEqual('the coffee district')
    })
    it('updates shop address and returns shop', async function() {
      expect(shopService.getShopById).not.toHaveBeenCalled()
      expect(save).not.toHaveBeenCalled()
      const result = await shopService.updateShop('asdfse78787', mockUpdatedShopData)
      expect(shopService.getShopById).toHaveBeenCalled()
      expect(save).toHaveBeenCalled()
      expect(result.streetOne).toEqual(mockUpdatedShopData.streetOne)
    })
    it('updates description and returns shop', async function() {
      expect(shopService.getShopById).not.toHaveBeenCalled()
      expect(save).not.toHaveBeenCalled()
      const result = await shopService.updateShop('asdfse78787', mockUpdatedShopData)
      expect(result.description).toEqual(mockUpdatedShopData.description)
    })
  })
})
