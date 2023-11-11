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
import { PaymentEntity } from 'src/modules/payments/database/payments.entity';
import { PaymentGateway } from './payment.gateway';
import { PaymentsService } from 'src/modules/payments/payments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ItemEntity,
      ClientEntity,
      OrderEntity,
      PaymentEntity,
    ]),
  ],
  providers: [
    ProductGateway,
    ProductsService,
    ItemGateway,
    ItensService,
    OrdersService,
    ClientsService,
    PaymentGateway,
    PaymentsService,
  ],
})
export class GatewayModule {}
