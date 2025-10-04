import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryProductRequestDto } from './dto/CategoryProduct.dto';
@Injectable()
export class CategoryProductService {
  constructor(private prisma: PrismaService) {}
  async createCategoryProduct(dto: CategoryProductRequestDto) {
    return await this.prisma.categoryProduct.create({
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