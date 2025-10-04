import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { CreateExpertDto } from './dto/create-expert.dto';
import { UpdateExpertDto } from './dto/update-expert.dto';
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guards';
import { AuthGuard } from "../../common/guards/auth.guards";
import { Public } from "../../common/decorators/public.decorator";


@Controller('experts')
@UseGuards(AuthGuard, RolesGuard)
export class ExpertController {
  constructor(private readonly expertService: ExpertService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() dto: CreateExpertDto) {
    return this.expertService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.expertService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expertService.findOne(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExpertDto) {
    return this.expertService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expertService.remove(id);
  }
}
