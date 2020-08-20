import { IsNotEmpty, IsString, MinLength, MaxLength, IsDateString } from 'class-validator'

export class CreateShopDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(160)
  name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(160)
  streetOne: string

  @IsString()
  streetTwo: string

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(160)
  city: string

  @IsNotEmpty()
  @IsString()
  state: string

  @IsNotEmpty()
  @IsString()
  zip: string

  @IsDateString()
  dateVisited: Date

  @IsString()
  description: string
}