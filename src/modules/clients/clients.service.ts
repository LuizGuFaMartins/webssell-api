import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
import { OrdersService } from '../orders/orders.service';
import { ClientEntity } from './database/clients.entity';
import { ClientInputDTO } from './dtos/clientsInput.dto';

@Injectable()
export class ClientsService extends AbstractService<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {
    super();
    this.setRepository(clientRepository);
  }

  async findOne(id: any): Promise<ClientEntity> {
    return this.clientRepository.findOne({
      where: { clientId: id },
    });
  }

  async findOneByEmail(clientEmail: string): Promise<ClientEntity> {
    return this.clientRepository.findOne({
      where: { clientEmail: clientEmail },
    });
  }

  // async createClientAndOrder(client: ClientInputDTO): Promise<ClientEntity> {
  //   const savedClient = await this.create(client)[0];
  //   await this.orderService.create({
  //     clientId: savedClient.clientId,
  //   });
  //   return savedClient;
  // }
}
