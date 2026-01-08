import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateMenuDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  restaurantId!: string;
}
