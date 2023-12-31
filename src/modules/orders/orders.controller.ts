import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AbstractController } from 'src/abstracts/controllers/abstract.controller';
import { OrderEntity } from './database/orders.entity';
import { OrderInputDTO } from './dtos/ordersInput.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController extends AbstractController<OrderEntity> {
  constructor(private readonly ordersService: OrdersService) {
    super(ordersService);
    this.setIdentifierName('orderId');
  }

  @Post()
  @ApiBody({ type: OrderInputDTO })
  async create(@Body() product: OrderInputDTO): Promise<OrderEntity[]> {
    return await this.service.create(product);
  }

  @Put(':id')
  @ApiBody({ type: OrderInputDTO })
  async update(
    @Param('id') id: number,
    @Body() order: OrderInputDTO,
  ): Promise<OrderEntity> {
    return await this.service.update(id, order);
  }

  @Patch('finish-order/:id')
  async finishOrder(@Param('id') id: number): Promise<OrderEntity> {
    return await this.ordersService.finishOrder(id);
  }

  @Get('/find-per-client/:id')
  async findPerClient(@Param('id') id: number): Promise<OrderEntity[]> {
    return await this.ordersService.findPerClientId(id);
  }

  @Get('/find-open-order/:clientId')
  async findOpenOrderPerClient(
    @Param('clientId') id: number,
  ): Promise<OrderEntity[]> {
    return this.ordersService.findOpenOrderPerClientId(id);
  }

  @Get('/find-open-order')
  async findOpenOrder(): Promise<OrderEntity[]> {
    return this.ordersService.findOpenOrders();
  }
}
