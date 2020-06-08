import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopRepository } from './shop.repository';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopRepository) private shopRepository: ShopRepository
  ) {}

  async createShop(createShopDto: CreateShopDto): Promise<Shop> {
    console.log('createShop called')
    return this.shopRepository.createShop(createShopDto)
  }

  async getShops(): Promise<Shop[]> {
    console.log('getShops called')
    const shops = await this.shopRepository.find()
    console.log('shops')
    console.log(shops)
    return shops
  }
}
