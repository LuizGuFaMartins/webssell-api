import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './database/payments.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ClientEntity } from '../clients/database/clients.entity';
import { OrderEntity } from '../orders/database/orders.entity';
import { ClientsService } from '../clients/clients.service';
import { OrdersService } from '../orders/orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, ClientEntity, OrderEntity])],
  controllers: [PaymentsController],
  providers: [PaymentsService, ClientsService, OrdersService],
})
export class PaymentsModule {}
