import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SqsService } from '@ssut/nestjs-sqs';
import { TransformerInterceptor } from 'nestjs-class-transformer';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ClientsService } from '../clients/clients.service';
import { OrderEntity } from './database/orders.entity';
import { OrderStatus } from './enums/order-status.enum';
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

  async finishOrder(id: number, orderTotalPrice: number): Promise<OrderEntity> {
    let order: OrderEntity = await this.findOne(id);
    const uidd = uuidv4();
    order.orderStatus = OrderStatus.FINISHED;
    order.orderTotalPrice = orderTotalPrice;
    this.create({
      clientId: order.clientId,
    });
    order = await this.update(id, order);
    const client = await this.clientsService.findOne(order.clientId);

    const message: any = {
      id: uidd,
      body: {
        clientId: order.clientId,
        orderId: order.orderId,
        calendario: {
          expiracao: process.env.CHARGE_EXPIRATION,
        },
        devedor: {
          cpf: client.clientCpf,
          nome: client.clientName,
        },
        valor: {
          original: order.orderTotalPrice.toFixed(2).toString(),
        },
        chave: process.env.PIX_KEY.toString(),
        solicitacaoPagador: 'Cobrança para finalizar o pedido',
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
