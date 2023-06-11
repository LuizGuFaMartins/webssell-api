import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './database/products.entity';
import { ProductDTO } from './dtos/products.dto';
import { ProductInputDTO } from './dtos/productsInput.dto';
import { ProductsService } from './products.service';
@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return await this.productsService.findAll();
  }

  @Post()
  @ApiBody({ type: ProductInputDTO })
  async create(@Body() product: ProductInputDTO): Promise<ProductEntity> {
    return await this.productsService.create(product);
  }
}
