import { EntityRepository, Repository } from "typeorm";
import { Shop } from './shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { Logger, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> {
  private logger = new Logger('ShopRepository')

  async createShop(createShopDto: CreateShopDto) {
    const shop = await this.create(createShopDto)
      .save()
      .catch(e => {
        this.logger.error(`Failed to create shop. Task data: ${createShopDto}.`, e.stack)
        throw new InternalServerErrorException()
      })
    return shop
  }
}
