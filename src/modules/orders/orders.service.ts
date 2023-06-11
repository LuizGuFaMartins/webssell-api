import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './database/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private OrderRepository: Repository<OrderEntity>,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return await this.OrderRepository.find();
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    return await this.OrderRepository.save(order);
  }
}
