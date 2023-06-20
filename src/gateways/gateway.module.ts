import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from 'src/modules/clients/clients.service';
import { ClientEntity } from 'src/modules/clients/database/clients.entity';
import { ItemEntity } from 'src/modules/itens/database/itens.entity';
import { ItensService } from 'src/modules/itens/itens.service';
import { OrderEntity } from 'src/modules/orders/database/orders.entity';
import { OrdersService } from 'src/modules/orders/orders.service';
import { ProductEntity } from 'src/modules/products/database/products.entity';
import { ProductsService } from 'src/modules/products/products.service';
import { ItemGateway } from './item.gateway';
import { ProductGateway } from './product.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ItemEntity,
      ClientEntity,
      OrderEntity,
    ]),
  ],
  providers: [
    ProductGateway,
    ProductsService,
    ItemGateway,
    ItensService,
    OrdersService,
    ClientsService,
  ],
})
export class GatewayModule {}
