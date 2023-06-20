import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformerInterceptor } from 'nestjs-class-transformer';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { OrderEntity } from './database/orders.entity';
import { OrderStatus } from './enums/order-status.enum';

@UseInterceptors(TransformerInterceptor)
@Injectable()
export class OrdersService extends AbstractService<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private clientsService: ClientsService,
  ) {
    super();
    this.setRepository(this.orderRepository);
  }

  async findOne(id: number): Promise<OrderEntity> {
    return await this.orderRepository.findOne({
      where: { orderId: id },
    });
  }

  async finishOrder(id: number): Promise<OrderEntity> {
    const order: OrderEntity = await this.findOne(id);

    order.orderStatus = OrderStatus.FINISHED;
    this.create({
      clientId: order.clientId,
    });
    return await this.update(id, order);
  }

  async findPerClientId(id: any): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: { clientId: id },
    });
  }

  async findOpenOrders(): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: { orderStatus: 'OPEN' },
    });
  }

  async findOpenOrderPerClientId(id: any): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: { clientId: id, orderStatus: 'OPEN' },
    });
  }
}
