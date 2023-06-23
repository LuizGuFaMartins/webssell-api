import { ApiProperty } from '@nestjs/swagger';

export class ItemInputDTO {
  @ApiProperty()
  itemCode: string;

  @ApiProperty()
  itemQuantity: number;

  @ApiProperty()
  orderId: number;

  @ApiProperty()
  productId: number;
}
