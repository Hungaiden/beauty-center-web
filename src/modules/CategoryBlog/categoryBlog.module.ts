import { Module } from '@nestjs/common';
import { CategoryBlogController } from './categoryBlog.controller';
import { CategoryBlogService } from './categoryBlog.service';
import { PrismaService } from '../../prisma/prisma.service'; // Nếu bạn sử dụng Prisma

@Module({
  controllers: [CategoryBlogController],
  providers: [CategoryBlogService, PrismaService], // Thêm PrismaService nếu cần
})
export class CategoryBlogModule {}