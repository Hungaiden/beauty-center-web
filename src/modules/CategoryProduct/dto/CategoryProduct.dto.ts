import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CategoryProductRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
}
