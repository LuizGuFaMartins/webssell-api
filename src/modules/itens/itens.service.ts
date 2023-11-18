import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
import { OrderEntity } from './../orders/database/orders.entity';
import { OrdersService } from './../orders/orders.service';
import { ItemEntity } from './database/itens.entity';
import { ItensInputWithClientDTO } from './dtos/itensInputWithClient.dto';

@Injectable()
export class ItensService extends AbstractService<ItemEntity> {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
    private ordersService: OrdersService,
  ) {
    super();
    this.setRepository(itemRepository);
  }

  async findOne(id: any): Promise<ItemEntity> {
    return this.itemRepository.findOne({
      where: { itemId: id },
    });
  }

  async findAll(): Promise<ItemEntity[]> {
    return await this.itemRepository.find({
      relations: {
        product: true,
      },
    });
  }

  async findPerProductId(id: any): Promise<ItemEntity[]> {
    return await this.itemRepository.find({
      where: { productId: id },
    });
  }

  async findPerOpenOrderClientId(clientId: any): Promise<ItemEntity[]> {
    const orders = await this.ordersService.findOpenOrderPerClientId(clientId);
    let itens;
    if (orders.length > 0) {
      itens = await this.itemRepository.find({
        where: { orderId: orders[0].orderId },
        relations: {
          product: true,
        },
      });
    }
    return itens || [];
  }

  async createWithOpenOrder(
    itemInputDTO: ItensInputWithClientDTO,
  ): Promise<ItemEntity> {
    const entity = await this.repository.create(itemInputDTO);
    let order: OrderEntity[] =
      await this.ordersService.findOpenOrderPerClientId(itemInputDTO.clientId);

    if (!order || order.length === 0) {
      order = await this.ordersService.create({
        clientId: itemInputDTO.clientId,
      });
    }

    entity.orderId = order[0].orderId;
    const savedEntity = await this.repository.save(entity);
    return savedEntity;
  }
}
