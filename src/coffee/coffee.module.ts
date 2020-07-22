import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { CoffeeRepository } from './coffee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeRepository])],
  controllers: [CoffeeController],
  providers: [CoffeeService]
})
export class CoffeeModule {}
