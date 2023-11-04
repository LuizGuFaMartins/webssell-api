import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
import { ClientEntity } from './database/clients.entity';

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
      // where: { clientId: id },
      where: { clientEmail: id},
    });
  }
}
