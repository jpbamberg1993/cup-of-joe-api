import { Controller, Get, Logger, Param, Post, UsePipes, ValidationPipe, Body, Delete, Patch } from '@nestjs/common';
import { Shop } from './shop.entity'
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';

@Controller('shop')
export class ShopController {
  private logger = new Logger('ShopController')

  constructor(private shopService: ShopService) {}

  @Get('/:id')
  async getShopById(@Param('id') id: string): Promise<Shop> {
    return this.shopService.getShopById(id)
  }

  @Get()
  async getShops(): Promise<Shop[]> {
    this.logger.verbose(`Retrieving all tasks.`)
    return this.shopService.getShops()
  }

  @Post()
  @UsePipes(ValidationPipe)
  createShop(@Body() createShopDto: CreateShopDto): Promise<Shop> {
    this.logger.verbose(`Creating a new task. Data: ${JSON.stringify(createShopDto)}`)
    return this.shopService.createShop(createShopDto)
  }

  @Delete(':id')
  deleteShop(@Param('id') id: string): Promise<void> {
    return this.shopService.deleteShop(id)
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateShop(@Param('id') id: string, @Body() updateShopDto: CreateShopDto): Promise<Shop> {
    this.logger.verbose(`Updating shop. Data: ${JSON.stringify(updateShopDto)}`)
    return this.shopService.updateShop(id, updateShopDto)
  }
}
