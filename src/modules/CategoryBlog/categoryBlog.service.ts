import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryBlogRequestDto } from './dto/categoryBlog.dto';
@Injectable()
export class CategoryBlogService {
  constructor(private prisma: PrismaService) {}
  async createCategoryBlog(dto: CategoryBlogRequestDto) {
    return await this.prisma.categoryBlog.create({
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }
  getAllCategoryBlogs(): string {
    return 'List of category blogs';
  }
}