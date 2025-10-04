import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './Order.service';
import { OrderRequestDto } from './dto/Order.dto';
import { AuthGuard } from '../../common/guards/auth.guards';
import { RolesGuard } from '../../common/guards/roles.guards';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface'; 

@Controller('orders')
@UseGuards(AuthGuard, RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(Role.User)
  create(@Body() dto: OrderRequestDto, @Request() req: RequestWithUser) {
    return this.orderService.create(dto, req);
  }
}