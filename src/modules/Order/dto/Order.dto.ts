import { IsNotEmpty, IsString, IsNumber, IsArray, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

enum PaymentMethod {
  VNPay = 'VNPay',
  CASH = 'CASH',
}

class OrderDetailDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class OrderRequestDto {
 
  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDto)
  orderDetails: OrderDetailDto[];

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}