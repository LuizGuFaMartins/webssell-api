import { ApiProperty } from '@nestjs/swagger';

export class ProductInputDTO {
  @ApiProperty()
  productName: string;

  @ApiProperty()
  productPrice: number;

  @ApiProperty()
  productCode: string;
}
