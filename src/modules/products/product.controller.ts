import { Controller, Post, Body, Get, Param, Patch, Delete,UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '../../common/guards/auth.guards';
import { RolesGuard } from '../../common/guards/roles.guards';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { Public } from '../../common/decorators/public.decorator';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Public() 
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }
  @Public() 
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Public() // Cho phép truy cập công khai, không cần xác thực
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
   @Public() 
  @Get('category/:category')
  findbycategory(@Param('category') category: string) {
    return this.productService.finbycategory(category);
  }
}
