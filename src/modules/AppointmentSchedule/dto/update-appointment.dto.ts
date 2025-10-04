import { IsOptional, IsString, IsDateString, IsIn } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsIn(['pending', 'confirmed', 'cancelled', 'done'])
  status?: string;
}
