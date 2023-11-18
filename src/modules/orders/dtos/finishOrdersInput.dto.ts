import { ApiProperty } from '@nestjs/swagger';

export class FinishOrdersInput {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  orderTotalPrice: number;
}
