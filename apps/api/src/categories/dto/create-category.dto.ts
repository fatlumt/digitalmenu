import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  menuId!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(0)
  sortOrder!: number;
}
