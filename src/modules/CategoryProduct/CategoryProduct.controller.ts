import { Controller,Get, Post, Body, HttpCode, HttpStatus,UseGuards } from '@nestjs/common';
import { CategoryProductService } from './CategoryProduct.service';
import { CategoryProductRequestDto } from './dto/CategoryProduct.dto';
import { AuthGuard } from '../../common/guards/auth.guards';
import { RolesGuard } from '../../common/guards/roles.guards';
import { Public } from '../../common/decorators/public.decorator';
@Controller('CategoryProducts')
@UseGuards(AuthGuard, RolesGuard)
export class CategoryProductController {
  constructor(private readonly categoryProductService: CategoryProductService) {}
@Public()
  @Post('createCategoryBlog')
  @HttpCode(HttpStatus.CREATED)
  async createCategoryBlog(@Body() dto: CategoryProductRequestDto) {
    return await this.categoryProductService.createCategoryProduct(dto);
  }
}