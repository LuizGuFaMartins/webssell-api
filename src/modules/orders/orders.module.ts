import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from '../clients/clients.service';
import { ClientEntity } from '../clients/database/clients.entity';
import { OrderEntity } from './database/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ClientEntity])],
  controllers: [OrdersController],
  providers: [OrdersService, ClientsService],
})
export class OrdersModule {}
