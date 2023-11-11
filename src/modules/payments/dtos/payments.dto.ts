import { ApiProperty } from '@nestjs/swagger';

export class PaymentDTO {
  @ApiProperty()
  paymentId: number;

  @ApiProperty()
  paymentName: string;

  @ApiProperty()
  paymentCpf: string;

  @ApiProperty()
  paymentPrice: number;

  @ApiProperty()
  paymentKey: string;

  @ApiProperty()
  paymentQrcode: string;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  orderId: number;
}