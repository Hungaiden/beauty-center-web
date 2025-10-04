import { Body, Controller, Get, Post, UseGuards, Param, Delete, Put} from "@nestjs/common";
import { AuthGuard } from "../../common/guards/auth.guards";
import { RolesGuard } from "../../common/guards/roles.guards";
import { BlogService } from "./blog.service";
import { Public } from "../../common/decorators/public.decorator";
import { CreateBlogDto } from "./dto/create-blog.dto";



@Controller('blogs')
@UseGuards(AuthGuard, RolesGuard)
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Public()
    @Post()
    create(@Body() dto: CreateBlogDto) {
        return this.blogService.create(dto);
    }

    @Public()
    @Get()
    findAll() {
        return this.blogService.findAll();
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: CreateBlogDto) {
        return this.blogService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.blogService.remove(id);
    }

}