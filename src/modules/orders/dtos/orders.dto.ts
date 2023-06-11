import { ApiProperty } from '@nestjs/swagger';
import { ClientDTO } from 'src/modules/clients/dtos/clients.dto';

export class OrderDTO {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  client: ClientDTO;

  @ApiProperty()
  orderObservation: string;

  @ApiProperty()
  orderTotalPrice: number;

  @ApiProperty()
  orderStatus: string;
}
