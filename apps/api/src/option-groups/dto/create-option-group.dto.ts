import { IsInt, IsString, Min } from "class-validator";

export class CreateOptionGroupDto {
  @IsString()
  itemId!: string;

  @IsString()
  name!: string;

  @IsInt()
  @Min(0)
  minSelectable!: number;

  @IsInt()
  @Min(1)
  maxSelectable!: number;
}
