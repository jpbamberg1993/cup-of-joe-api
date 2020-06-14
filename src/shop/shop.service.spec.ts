import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopService } from './shop.service';
import { ShopRepository } from './shop.repository';
import { typeOrmConfig } from '../config/typeorm.config';

describe('ShopService', () => {
  let shopService: ShopService
  let shopRepository: ShopRepository 

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([ShopRepository])
      ],
      providers: [
        ShopService,
      ]
    })
    .compile()
    shopService = module.get<ShopService>(ShopService)
    shopRepository = module.get<ShopRepository>(ShopRepository)
  })

  describe('createShop', () => {
    it('calls shopRepository.createShop and successfully returns shop', async () => {
      const shop = {
        name: 'coffee district',
        streetOne: '325 ne 2nd ave',
        streetTwo: '104',
        city: 'delray beach',
        state: 'florida',
        zip: '33444',
        dateVisited: new Date(),
        description: `Sorta cool layout, weird painting I can't figure out`,
      }
      const result = await shopService.createShop(shop)
      expect(shopRepository.createShop).toHaveBeenCalled()
      expect(result.name).toEqual(shop.name)
      const shopList = await shopService.getShops()
      const shopInDb = shopList.find(dbShop => dbShop.name === shop.name && dbShop.streetOne === shop.streetOne)
      expect(shopInDb).not.toEqual(undefined)
    })
  })

  describe('deleteShop', () => {
    it.todo('calls shopRepository.delete to delete a task')
    it.todo('throws an error if shop could not be found')
  })

  describe('updateShop', () => {
    it.todo('updates shop name and returns shop')
    it.todo('updates shop address and returns shop')
    it.todo('updates description and returns shop')
  })

  describe('getShops', () => {
    it('gets all shops from repository', async () => {
      const shop = {
        name: 'yaxche teahouse',
        streetOne: '325 ne 2nd ave',
        streetTwo: '104',
        city: 'delray beach',
        state: 'florida',
        zip: '33444',
        dateVisited: new Date(),
        description: `Sorta cool layout, weird painting I can't figure out`,
      }
      await shopService.createShop(shop)
      const result = await shopService.getShops()
      expect(result.length).toEqual(2)
    })
  })

  describe('getShopById', () => {
    it.todo('calls shopRepository.findOne and succesfully returns the shop')
  })
})
