import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateAdvertDto {
  @IsNumber()
  @IsNotEmpty()
  sell: string

  @IsNumber()
  @IsNotEmpty()
  buy: string

  @IsUrl()
  @IsNotEmpty()
  @IsString()
  url: string
}
