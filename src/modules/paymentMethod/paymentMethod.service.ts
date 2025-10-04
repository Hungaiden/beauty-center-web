import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentMethodService {
  getAllPaymentMethods(): string {
    return 'List of payment methods';
  }
}