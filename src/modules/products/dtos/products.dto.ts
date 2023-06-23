import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  productPrice: number;

  @ApiProperty()
  productCode: string;
}
