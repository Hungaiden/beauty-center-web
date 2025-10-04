import { Controller,Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CategoryBlogService } from './categoryBlog.service';
import { CategoryBlogRequestDto } from './dto/categoryBlog.dto';

@Controller('CategoryBlogs')
export class CategoryBlogController {
  constructor(private readonly categoryBlogService: CategoryBlogService) {}

  @Get()
  getAllCategoryBlogs(): string {
    return this.categoryBlogService.getAllCategoryBlogs();
  }
  @Post('createCategoryBlog')
  @HttpCode(HttpStatus.CREATED)
  async createCategoryBlog(@Body() dto: CategoryBlogRequestDto) {
    return await this.categoryBlogService.createCategoryBlog(dto);
  }
}