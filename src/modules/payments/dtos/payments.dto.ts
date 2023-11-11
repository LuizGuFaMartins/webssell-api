import { ApiProperty } from '@nestjs/swagger';

export class PaymentDTO {
  @ApiProperty()
  paymentId: string;

  @ApiProperty()
  paymentName: string;

  @ApiProperty()
  paymentCpf: string;

  @ApiProperty()
  paymentPrice: number;

  @ApiProperty()
  paymentKey: string;

  @ApiProperty()
  paymentQrCode: string;

  @ApiProperty()
  paymentCreatedAt: Date;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  orderId: number;
}
