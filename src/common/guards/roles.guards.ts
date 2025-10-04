import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // công cụ của NestJS để đọc metadata mà decorator đã gắn.

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [ // Lấy metadata 'roles' từ decorator @Roles()
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // Không yêu cầu vai trò => cho phép truy cập
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role); 
  }
}
