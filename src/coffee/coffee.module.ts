import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { CoffeeRepository } from './coffee.repository';
import { ShopModule } from '../shop/shop.module';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeRepository]), ShopModule],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
