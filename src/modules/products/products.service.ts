import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './database/products.entity';
import { ProductInputDTO } from './dtos/productsInput.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async create(product: ProductInputDTO): Promise<ProductEntity> {
    const entity: ProductEntity = new ProductEntity();
    entity.productName = product.productName;
    entity.productDescription = product.productDescription;
    entity.productPrice = product.productPrice;
    entity.productQuantity = product.productQuantity;
    return await this.productRepository.save(entity);
  }
}
