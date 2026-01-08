import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class UpdateOptionGroupDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  minSelectable?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxSelectable?: number;
}
