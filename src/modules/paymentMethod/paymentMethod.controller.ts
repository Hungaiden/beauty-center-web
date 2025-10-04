import { Controller, Get } from '@nestjs/common';
import { PaymentMethodService } from './paymentMethod.service';

@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get()
  getAllPaymentMethods(): string {
    return this.paymentMethodService.getAllPaymentMethods();
  }
}