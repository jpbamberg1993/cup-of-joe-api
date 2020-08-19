import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { ShopRepository } from './shop.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ShopRepository])],
  controllers: [ShopController],
  providers: [ShopService],
  exports: [TypeOrmModule.forFeature([ShopRepository])],
})
export class ShopModule {}
