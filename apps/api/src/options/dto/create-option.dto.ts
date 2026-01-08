import { IsNumber, IsString } from "class-validator";

export class CreateOptionDto {
  @IsString()
  optionGroupId!: string;

  @IsString()
  name!: string;

  @IsNumber()
  priceDelta!: number;
}
