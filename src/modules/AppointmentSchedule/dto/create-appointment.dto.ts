import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateAppointmentDto {

  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;
}
