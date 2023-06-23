import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
import { ProductEntity } from './database/products.entity';

@Injectable()
export class ProductsService extends AbstractService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {
    super();
    this.setRepository(productRepository);
  }

  async findOne(id: any): Promise<ProductEntity> {
    return this.productRepository.findOne({
      where: { productId: id },
    });
  }
}
