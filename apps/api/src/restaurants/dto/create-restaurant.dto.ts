import { IsArray, IsOptional, IsString, IsUrl, Matches, MinLength } from "class-validator";

export class CreateRestaurantDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(3)
  @Matches(/^[a-z0-9-]+$/)
  slug!: string;

  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @IsString()
  address!: string;

  @IsString()
  phone!: string;

  @IsString()
  currency!: string;

  @IsArray()
  languages!: string[];

  @IsOptional()
  socialLinks?: Record<string, string>;
}
