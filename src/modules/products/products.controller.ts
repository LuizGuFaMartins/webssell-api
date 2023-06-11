import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ProductEntity } from './database/products.entity';
import { ProductDTO } from './dtos/products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return await this.productsService.findAll();
  }

  @Post()
  @ApiBody({ type: ProductDTO })
  async create(@Body() client: ProductDTO): Promise<ProductEntity> {
    return await this.productsService.create(client);
  }
}
