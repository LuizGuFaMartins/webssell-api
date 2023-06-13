import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/modules/products/database/products.entity';
import { ProductGateway } from './product.gateway';
import { ProductsService } from 'src/modules/products/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductGateway, ProductsService],
})
export class GatewayModule {}
