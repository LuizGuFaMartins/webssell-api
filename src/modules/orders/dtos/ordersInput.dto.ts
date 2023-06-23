import { ApiProperty } from '@nestjs/swagger';

export class OrderInputDTO {
  @ApiProperty()
  clientId: number;

  @ApiProperty()
  itensIds: number[];

  @ApiProperty()
  orderTotalPrice: number;

  @ApiProperty()
  orderStatus: string;
}
