import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get('/find-per-client/:id')
  async findPerClient(@Param('id') id: number): Promise<OrderEntity[]> {
    return this.ordersService.findPerClientId(id);
  }
}
