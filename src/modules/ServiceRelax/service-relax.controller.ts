import { Controller, Post, Get, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ServiceRelaxService } from './service-relax.service';
import { CreateServiceRelaxDto } from './dto/create-service-relax.dto';
import { UpdateServiceRelaxDto } from './dto/update-service-relax.dto';
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guards';
import { AuthGuard } from "../../common/guards/auth.guards";
import { Public } from "../../common/decorators/public.decorator";

@Controller('service-relax')
@UseGuards(AuthGuard, RolesGuard)
export class ServiceRelaxController {
  constructor(private readonly service: ServiceRelaxService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() dto: CreateServiceRelaxDto) {
    return this.service.create(dto);
  }

  @Public()
  @Get()
  findAll(@Query('keyword') keyword?: string, @Query('category') category?: string) {
    return this.service.findAll(keyword, category);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateServiceRelaxDto) {
    return this.service.update(id, dto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
