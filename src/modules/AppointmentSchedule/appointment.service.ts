import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAppointmentDto, userId: string) {
    return this.prisma.appointmentSchedule.create({
      data: {
        date: new Date(dto.date),
        time: dto.time,
        userId,
        status: 'pending',
      },
    });
  }

  findAll() {
    return this.prisma.appointmentSchedule.findMany();
  }

  async findOne(id: string) {
    const appt = await this.prisma.appointmentSchedule.findUnique({
      where: { id },
    });
    if (!appt) throw new NotFoundException('Appointment not found');
    return appt;
  }

  update(id: string, dto: UpdateAppointmentDto) {
    return this.prisma.appointmentSchedule.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.date && { date: new Date(dto.date) }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.appointmentSchedule.delete({ where: { id } });
  }
}
