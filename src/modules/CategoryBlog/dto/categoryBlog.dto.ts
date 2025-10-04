import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CategoryBlogRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
}
