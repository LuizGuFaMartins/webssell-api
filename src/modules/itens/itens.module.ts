import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from '../clients/clients.service';
import { ClientEntity } from '../clients/database/clients.entity';
import { OrderEntity } from '../orders/database/orders.entity';
import { OrdersService } from '../orders/orders.service';
import { ProductEntity } from '../products/database/products.entity';
import { ItemEntity } from './database/itens.entity';
import { ItensController } from './itens.controller';
import { ItensService } from './itens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemEntity,
      ProductEntity,
      OrderEntity,
      ClientEntity,
    ]),
  ],
  controllers: [ItensController],
  providers: [ItensService, OrdersService, ClientsService],
})
export class ItensModule {}
