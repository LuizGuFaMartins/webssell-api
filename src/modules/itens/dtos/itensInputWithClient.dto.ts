import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from 'src/modules/products/dtos/products.dto';

export class ItensInputWithClientDTO {
  @ApiProperty()
  itemCode: string;

  @ApiProperty()
  itemQuantity: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  product: ProductDTO;
}
