import { IsNotEmpty, IsString } from "class-validator";

export class ShopIdDto {
  @IsNotEmpty()
  @IsString()
  shopid: string
}