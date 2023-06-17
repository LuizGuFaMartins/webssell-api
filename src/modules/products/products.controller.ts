import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AbstractController } from 'src/abstracts/controllers/abstract.controller';
import { ProductInputDTO } from 'src/modules/products/dtos/productsInput.dto';
import { ProductEntity } from './database/products.entity';
import { ProductsService } from './products.service';
@ApiTags('Products')
@Controller('products')
export class ProductsController extends AbstractController<ProductEntity> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
    this.setIdentifierName('productId');
  }

  @Post()
  @ApiBody({ type: ProductInputDTO })
  async create(@Body() product: ProductInputDTO): Promise<ProductEntity[]> {
    return await this.productsService.create(product);
  }

  @Put(':id')
  @ApiBody({ type: ProductInputDTO })
  async update(
    @Param('id') id: number,
    @Body() product: ProductInputDTO,
  ): Promise<ProductEntity> {
    return await this.service.update(id, product);
  }
}
