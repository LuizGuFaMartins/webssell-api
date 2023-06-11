import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  productDescription: string;

  @ApiProperty()
  productPrice: number;

  @ApiProperty()
  productQuantity: number;
}
