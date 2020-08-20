import { IsNotEmpty, IsString } from "class-validator"

export class CreateCoffeeDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  origin: string

  @IsNotEmpty()
  @IsString()
  type: string
}