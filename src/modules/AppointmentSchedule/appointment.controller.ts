import {
  Controller, Get, Post, Body, Param, Delete, Put,
  UseGuards,Req
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guards';
import { AuthGuard } from "src/common/guards/auth.guards";
import { Public } from "src/common/decorators/public.decorator";

@UseGuards(AuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() dto: CreateAppointmentDto, @Req() req: any) {
    const userId = req.user.sub;
    console.log(req.user)
    return this.appointmentService.create(dto, userId);
  }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
