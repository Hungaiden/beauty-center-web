import { Module } from '@nestjs/common';
import { OrderController } from './Order.controller';
import { OrderService } from './Order.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

export const jwtConstants = {
  secret: 'KlcoCOxeKWejc3O73XYaaZQgYT1J2Ia3EmM3IXavBJGW6Gq9mcqEIfkKsB/yuC1R',
};

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}