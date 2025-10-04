import { Module } from '@nestjs/common';
import { CategoryProductController } from './CategoryProduct.controller';
import { CategoryProductService } from './CategoryProduct.service';
import { PrismaService } from '../../prisma/prisma.service'; // Nếu bạn sử dụng Prisma

@Module({
  controllers: [CategoryProductController],
  providers: [CategoryProductService, PrismaService], 
})
export class CategoryProductModule {}