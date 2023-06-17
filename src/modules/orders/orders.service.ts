import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { TransformerInterceptor } from 'nestjs-class-transformer';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { OrderEntity } from './database/orders.entity';
import { OrderInputDTO } from './dtos/ordersInput.dto';

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

  async findOne(id: any): Promise<OrderEntity> {
    return this.orderRepository.findOne({
      where: { orderId: id },
      relations: {
        itens: true,
      },
    });
  }

  // async createOrder(orderInputDTO: OrderInputDTO): Promise<OrderEntity> {
  //   const entity = plainToInstance(OrderEntity, orderInputDTO);
  //   return await this.repository.save(entity);
  // }

  async findPerClientId(id: any): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: { clientId: id },
    });
  }
}
