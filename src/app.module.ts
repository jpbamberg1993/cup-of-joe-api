import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ShopModule } from './shop/shop.module';
import { CoffeeModule } from './coffee/coffee.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ShopModule,
    CoffeeModule,
    RatingModule
  ],
})
export class AppModule {}
