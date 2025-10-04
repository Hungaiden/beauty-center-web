import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCartByUserId(userId: string) {
    
    return this.prisma.cart.findFirst({
      where: { userId },
    });
  }

  async addItemToCart(
    userId: string,
    productId: string,
    quantity: number,
    productName: string,
    price: number,
  ) {
    let cart = await this.prisma.cart.findFirst({ where: { userId } });

    if (!cart) {
      // Tạo mới cart nếu chưa có
      return this.prisma.cart.create({
        data: {
          userId,
          items: [
            {
              productId,
              productName,
              quantity,
              price,
            },
          ],
        },
      });
    }

    // Kiểm tra sản phẩm đã có trong cart chưa
    const existingItemIndex = cart.items.findIndex((item) => item.productId === productId);

    if (existingItemIndex > -1) {
      // Nếu có → tăng số lượng
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Nếu chưa có → thêm mới
      cart.items.push({
        productId,
        productName,
        quantity,
        price,
      });
    }

    return this.prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items,
      },
    });
  }

  async updateCartItem(userId: string, productId: string, quantity: number) {
    const cart = await this.prisma.cart.findFirst({ where: { userId } });

    if (!cart) throw new NotFoundException('Cart not found');

    const itemIndex = cart.items.findIndex((item) => item.productId === productId);
    if (itemIndex === -1) throw new NotFoundException('Product not in cart');

    cart.items[itemIndex].quantity = quantity;

    return this.prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items,
      },
    });
  }

  async removeItemFromCart(userId: string, productId: string) {
    const cart = await this.prisma.cart.findFirst({ where: { userId } });

    if (!cart) throw new NotFoundException('Cart not found');

    const newItems = cart.items.filter((item) => item.productId !== productId);

    return this.prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: newItems,
      },
    });
  }

  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findFirst({ where: { userId } });

    if (!cart) throw new NotFoundException('Cart not found');

    return this.prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: [],
      },
    });
  }
}
