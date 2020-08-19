import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CoffeeRepository } from './coffee.repository'
import { Coffee } from './coffee.entity'
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { ShopRepository } from '../shop/shop.repository'

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(CoffeeRepository) private coffeeRepository: CoffeeRepository,
    @InjectRepository(ShopRepository) private shopRepository: ShopRepository
  ) {}

  async getCoffeeByShopId(shopId: string): Promise<Coffee[]> {
    const found = await this.coffeeRepository.find({
      where: { shopId }
    })
    if (!found) {
      throw new NotFoundException(`Cannot find coffee belonging to shop with id of ${shopId}.`)
    }
    return found
  }

  async getCoffeeById(id: string): Promise<Coffee> {
    const found = await this.coffeeRepository.findOne(id)
    if (!found) {
      throw new NotFoundException(`Cannont find coffee with the id of ${id}.`)
    }
    return found
  }

  async createCoffee(createCoffeeDto: CreateCoffeeDto, shopId: string): Promise<Coffee> {
    const shop = await this.shopRepository.findOne(shopId)
    return this.coffeeRepository.createCoffee(createCoffeeDto, shop)
  }

  async deleteCoffee(id: string): Promise<void> {
    const result = await this.coffeeRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with Id='${id}' no found.`)
    }
  }

  async updateCoffee(id: string, updateCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const coffee = await this.getCoffeeById(id)
    coffee.name = updateCoffeeDto.name
    coffee.description = updateCoffeeDto.description
    coffee.origin = updateCoffeeDto.origin
    coffee.type = updateCoffeeDto.type
    await coffee.save()
    return coffee
  }
}
