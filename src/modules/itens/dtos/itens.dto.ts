import { ApiProperty } from '@nestjs/swagger';
import { OrderDTO } from 'src/modules/orders/dtos/orders.dto';
import { ProductDTO } from 'src/modules/products/dtos/products.dto';

export class ItemDTO {
  @ApiProperty()
  itemId: number;

  @ApiProperty()
  itemCode: string;

  @ApiProperty()
  itemQuantity: number;

  @ApiProperty()
  order: OrderDTO;

  @ApiProperty()
  productId: ProductDTO;
}
