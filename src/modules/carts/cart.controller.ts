import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { AuthGuard } from '../../common/guards/auth.guards'; 

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // api lay danh sach cac san pham trong gio hang
  @Get()
  async getCart(@Req() req: Request) {
    const userId = req['user'].sub;
    return this.cartService.getCartByUserId(userId);
  }
  
  // api them san pham vao gio hang
  @Post('items')
  async addItem(
    @Req() req: Request,
    @Body()
    body: { productId: string; quantity: number; productName: string; price: number },
  ) {
    const userId = req['user'].sub;
    return this.cartService.addItemToCart(
      userId,
      body.productId,
      body.quantity,
      body.productName,
      body.price,
    );
  }

  @Patch('items')
  async updateItem(
    @Req() req: Request,
    @Body() body: { productId: string; quantity: number },
  ) {
    const userId = req['user'].sub;
    return this.cartService.updateCartItem(userId, body.productId, body.quantity);
  }

  @Delete('items/:productId')
  async removeItem(@Req() req: Request, @Param('productId') productId: string) {
    const userId = req['user'].sub;
    return this.cartService.removeItemFromCart(userId, productId);
  }

  @Delete('clear')
  async clearCart(@Req() req: Request) {
    const userId = req['user'].sub;
    return this.cartService.clearCart(userId);
  }
}
