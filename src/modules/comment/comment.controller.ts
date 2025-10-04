import { Body, Controller, Post, UseGuards, Param, Get, Delete, Put} from "@nestjs/common";
import { AuthGuard } from "../../common/guards/auth.guards";
import { RolesGuard } from "../../common/guards/roles.guards";
import { CommentService } from "./comment.service";
import { Public } from "../../common/decorators/public.decorator";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "../../common/enums/role.enum";


@Controller('comments')
@UseGuards(AuthGuard, RolesGuard)
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Roles(Role.Admin, Role.User) // Chỉ cho phép người dùng có vai trò 'user' hoặc 'admin' truy cập
    @Post()
    create(@Body() dto: CreateCommentDto) {
        return this.commentService.createComment(dto);
    }

    @Public()
    @Get(':blogId')
    findAll(@Param('blogId') blogId: string) {
        return this.commentService.findAllComments(blogId);
    }

    @Roles(Role.Admin, Role.User) // Chỉ cho phép người dùng có vai trò 'user' hoặc 'admin' truy cập
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentService.deleteComment(id);
    }

    @Roles(Role.Admin, Role.User) // Chỉ cho phép người dùng có vai trò 'user' hoặc 'admin' truy cập
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: CreateCommentDto) {
        return this.commentService.updateComment(id, dto);
    }

}