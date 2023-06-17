import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
import { OrderEntity } from './database/orders.entity';

@Injectable()
export class OrdersService extends AbstractService<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {
    super();
    this.setRepository(this.orderRepository);
  }

  async findOne(id: any): Promise<OrderEntity> {
    return this.orderRepository.findOne({
      where: { orderId: id },
    });
  }
}
