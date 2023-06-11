import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './database/orders.entity';
import { OrderInputDTO } from './dtos/ordersInput.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private OrderRepository: Repository<OrderEntity>,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return await this.OrderRepository.find();
  }

  async create(order: OrderInputDTO): Promise<OrderEntity> {
    const entity: OrderEntity = new OrderEntity();
    entity.orderObservation = order.orderObservation;
    entity.orderStatus = order.orderStatus;
    entity.orderTotalPrice = order.orderTotalPrice;
    return await this.OrderRepository.save(order);
  }
}
