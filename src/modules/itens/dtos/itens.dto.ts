import { ApiProperty } from '@nestjs/swagger';
import { OrderDTO } from 'src/modules/orders/dtos/orders.dto';
import { ProductDTO } from 'src/modules/products/dtos/products.dto';

export class ClientDTO {
  @ApiProperty()
  itemId: number;

  @ApiProperty()
  itemQuantity: number;

  @ApiProperty()
  itemPrice: number;

  @ApiProperty()
  order: OrderDTO;

  @ApiProperty()
  productId: ProductDTO;
}
