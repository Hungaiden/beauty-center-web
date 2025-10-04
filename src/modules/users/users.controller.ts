
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-users.dto";
import { UsersService } from "./users.service";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from '../../common/enums/role.enum';
import { RolesGuard } from '../../common/guards/roles.guards';
import { AuthGuard } from "../../common/guards/auth.guards";
import { Public } from "../../common/decorators/public.decorator";
import { PaginationDto } from "../../common/dtos/pagination.dto";
import { User } from "../../common/decorators/user.decorator";



@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Roles(Role.Admin) // Chỉ cho phép người dùng có vai trò 'admin' truy cập
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    // findAll(@Query() paginationDto: PaginationDto) {
    //     return this.usersService.getUsers(paginationDto);
    // }

    @Get('profile')
    @UseGuards(AuthGuard)
    getMyInfo(@User('sub') userId: string) {
        return this.usersService.getCurrentUser(userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}

