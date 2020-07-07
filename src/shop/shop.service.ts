import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopRepository } from './shop.repository';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopRepository) private shopRepository: ShopRepository
  ) {}

  // todo: add filtering at some point
  async getShops(): Promise<Shop[]> {
    return this.shopRepository.find()
  }

  async getShopById(id: number): Promise<Shop> {
    return this.shopRepository.findOne(id)
  }

  async createShop(createShopDto: CreateShopDto): Promise<Shop> {
    return this.shopRepository.createShop(createShopDto)
  }

  async deleteShop(id: number): Promise<void> {
    const result = await this.shopRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Shop with Id='${id}' not found.`)
    }
  }

  async updateShop(id: number, updateShopDto: CreateShopDto): Promise<Shop> {
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
