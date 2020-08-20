import { Logger, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from "typeorm"
import { Coffee } from './coffee.entity'
import { Shop } from '../shop/shop.entity'
import { CreateCoffeeDto } from './dto/create-coffee.dto'

@EntityRepository(Coffee)
export class CoffeeRepository extends Repository<Coffee> {
  private logger = new Logger('CoffeeRepository')

  async createCoffee(createCoffeeDto: CreateCoffeeDto, shop: Shop): Promise<Coffee> {
    const { name, description, origin, type } = createCoffeeDto
    const coffee = await this.create({
      name,
      description,
      origin,
      type,
      shop,
    }).save().catch(e => {
      this.logger.error(`Failed to create coffee for shop "${shop.name}". Task data: ${createCoffeeDto}.`, e.stack)
      throw new InternalServerErrorException()
    })
    delete coffee.shop
    return coffee
  }
}