import { Injectable, NotFoundException, Logger, Get, Post, Patch, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopRepository } from './shop.repository';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  private logger = new Logger('ShopController')

  constructor(
    @InjectRepository(ShopRepository) private shopRepository: ShopRepository
  ) {}

  // todo: add filtering at some point
  async getShops(): Promise<Shop[]> {
    return this.shopRepository.find()
  }

  async getShopById(id: string): Promise<Shop> {
    const shop = this.shopRepository.findOne(id)
    this.logger.debug('hey')
    this.logger.verbose({shop})
    return shop
  }

  async createShop(createShopDto: CreateShopDto): Promise<Shop> {
    return this.shopRepository.createShop(createShopDto)
  }

  async deleteShop(id: string): Promise<void> {
    const result = await this.shopRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Shop with Id='${id}' not found.`)
    }
  }

  async updateShop(id: string, updateShopDto: CreateShopDto): Promise<Shop> {
    const shop = await this.getShopById(id)
    shop.name = updateShopDto.name
    shop.streetOne = updateShopDto.streetOne
    shop.streetTwo = updateShopDto.streetTwo
    shop.city = updateShopDto.city
    shop.state = updateShopDto.state
    shop.zip = updateShopDto.zip
    shop.dateVisited = updateShopDto.dateVisited
    shop.description = updateShopDto.description
    await shop.save()
    return shop
  }
}
