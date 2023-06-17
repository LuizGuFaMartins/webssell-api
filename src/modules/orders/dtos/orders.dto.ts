import { ApiProperty } from '@nestjs/swagger';
import { ClientDTO } from 'src/modules/clients/dtos/clients.dto';
import { ItemDTO } from 'src/modules/itens/dtos/itens.dto';

export class OrderDTO {
  @ApiProperty()
  orderId: number;

  @ApiProperty()
  client: ClientDTO;

  @ApiProperty()
  itens: ItemDTO[];

  @ApiProperty()
  orderTotalPrice: number;

  @ApiProperty()
  orderStatus: string;
}
