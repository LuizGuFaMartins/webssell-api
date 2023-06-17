import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from 'src/modules/itens/database/itens.entity';
import { ItensService } from 'src/modules/itens/itens.service';
import { ProductEntity } from 'src/modules/products/database/products.entity';
import { ProductsService } from 'src/modules/products/products.service';
import { ItemGateway } from './item.gateway';
import { ProductGateway } from './product.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ItemEntity])],
  providers: [ProductGateway, ProductsService, ItemGateway, ItensService],
})
export class GatewayModule {}
