import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateOptionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  priceDelta?: number;
}
