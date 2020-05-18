import { Module } from '@nestjs/common';
import { CoffeeController } from './coffee.controller';

@Module({
  controllers: [CoffeeController]
})
export class CoffeeModule {}
