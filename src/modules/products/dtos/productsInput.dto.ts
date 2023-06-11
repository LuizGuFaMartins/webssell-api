import { ApiProperty } from '@nestjs/swagger';

export class ProductInputDTO {
  @ApiProperty()
  productName: string;

  @ApiProperty()
  productDescription: string;

  @ApiProperty()
  productPrice: number;

  @ApiProperty()
  productQuantity: number;
}
