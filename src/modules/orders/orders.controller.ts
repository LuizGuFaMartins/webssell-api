import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { OrderDTO } from './dtos/orders.dto';
import { OrdersService } from './orders.service';
import { OrderEntity } from './database/orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersService.findAll();
  }

  @Post()
  @ApiBody({ type: OrderDTO })
  async create(@Body() order: OrderDTO): Promise<OrderEntity> {
    return await this.ordersService.create(order);
  }
}
