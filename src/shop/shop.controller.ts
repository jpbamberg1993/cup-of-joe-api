import { Controller, Get } from '@nestjs/common';

@Controller('shop')
export class ShopController {
  @Get()
  async getShops(): Promise<[{id: string, name: string}]> {
    return [
      { id: '1csdfsdf', name: 'Cafe Integral' }
    ]
  }
}
