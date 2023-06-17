import { ApiProperty } from '@nestjs/swagger';

export class OrderInputDTO {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  itensIds: number[];

  @ApiProperty()
  orderTotalPrice: number;

  @ApiProperty()
  orderStatus: string;
}
