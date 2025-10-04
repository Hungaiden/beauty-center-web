import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderRequestDto } from './dto/Order.dto';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface'; 

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: OrderRequestDto, req: RequestWithUser) {
    // Lấy userId từ token (được gắn vào req.user bởi AuthGuard)
    const user = req.user;
    const userId = user.sub;

    // Kiểm tra user dựa trên userId từ token
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    if (existingUser.role !== 'user') {
      throw new ForbiddenException('Only users with role "user" can create orders');
    }

    // Kiểm tra productId trong orderDetails
    for (const detail of dto.orderDetails) {
      const product = await this.prisma.product.findUnique({
        where: { id: detail.productId },
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${detail.productId} not found`);
      }
    }

    // Tạo đơn hàng với userId từ token
    return this.prisma.order.create({
      data: {
        userId: userId,
        totalAmount: dto.totalAmount,
        orderDetails: dto.orderDetails,
        paymentMethod: dto.paymentMethod,
        shippingAddress: dto.shippingAddress,
        phoneNumber: dto.phoneNumber,
        status: 'pending',
        createdAt: new Date(),
      },
    });
  }
}