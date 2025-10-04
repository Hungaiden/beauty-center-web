import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceRelaxDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
