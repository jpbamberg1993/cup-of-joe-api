import { Controller, Logger, Get, Query, Param, Post, ValidationPipe, UsePipes, Body, Delete, Patch } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { Coffee } from './coffee.entity';
import { ShopIdDto } from './dto/shop-id.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffee')
export class CoffeeController {
  private logger = new Logger('CoffeeController')

  constructor(private coffeeService: CoffeeService) {}

  @Get('/:id')
  async getCoffeeById(@Param('id') id: string): Promise<Coffee> {
    return this.coffeeService.getCoffeeById(id)
  }

  @Get()
  async getCoffee(@Query() shopIdDto: ShopIdDto): Promise<Coffee[]> {
    const shopId = shopIdDto.shopid
    this.logger.verbose(`Getting all coffee belonging to shop with id of ${shopId}.`)
    return this.coffeeService.getCoffeeByShopId(shopId)
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCoffee(@Body() createCoffeeDto: CreateCoffeeDto, @Query() shopIdDto: ShopIdDto): Promise<Coffee> {
    const shopId = shopIdDto.shopid
    return this.coffeeService.createCoffee(createCoffeeDto, shopId)
  }

  @Delete(':id')
  async deleteCoffee(@Param('id') id: string): Promise<void> {
    return this.coffeeService.deleteCoffee(id)
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateCoffee(@Param('id') id: string, @Body() updateCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
      return this.coffeeService.updateCoffee(id, updateCoffeeDto)
  }
}
