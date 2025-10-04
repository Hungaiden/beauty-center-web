import { Module } from '@nestjs/common';
import { PaymentMethodController } from './paymentMethod.controller';
import { PaymentMethodService } from './paymentMethod.service';
import { PrismaService } from '../../prisma/prisma.service'; // Nếu bạn sử dụng Prisma

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService, PrismaService], // Thêm PrismaService nếu cần
})
export class PaymentMethodModule {}