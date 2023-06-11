import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { OrderEntity } from './database/orders.entity';
import { OrderInputDTO } from './dtos/ordersInput.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersService.findAll();
  }

  @Post()
  @ApiBody({ type: OrderInputDTO })
  async create(@Body() order: OrderInputDTO): Promise<OrderEntity> {
    return await this.ordersService.create(order);
  }
}
