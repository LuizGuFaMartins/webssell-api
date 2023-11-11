import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SqsService } from '@ssut/nestjs-sqs';
import { TransformerInterceptor } from 'nestjs-class-transformer';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { OrderEntity } from './database/orders.entity';
import { OrderStatus } from './enums/order-status.enum';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
@UseInterceptors(TransformerInterceptor)
@Injectable()
export class OrdersService extends AbstractService<OrderEntity> {
  constructor(
    private readonly sqsService: SqsService,
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
    let order: OrderEntity = await this.findOne(id);
    const uidd = UUID.generate();
    order.orderStatus = OrderStatus.FINISHED;
    this.create({
      clientId: order.clientId,
    });
    order = await this.update(id, order);

    const message: any = {
      id: uidd,
      body: {
        clientId: order.clientId,
        orderId: order.orderId,
        calendario: {
          expiracao: 3600,
        },
        devedor: {
          cpf: '43856478876',
          nome: 'Luiz Gustavo Farabello Martins',
        },
        valor: {
          original: '0.01',
        },
        chave: '2c3e3c57-7fcd-4c94-a05d-57cf87a2d5f1',
        solicitacaoPagador: 'Cobrança dos serviços prestados.',
      },
    };
    try {
      await this.sqsService.send(process.env.QUEUE_NAME, message);
      return order;
    } catch (error) {
      console.log(error);
      throw error;
    }
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
