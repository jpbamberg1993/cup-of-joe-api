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
    const shop = await this.shopRepository.createShop(createShopDto)
    return shop
  }

  async getShops(): Promise<Shop[]> {
    const shops = await this.shopRepository.find()
    return shops
  }
}
