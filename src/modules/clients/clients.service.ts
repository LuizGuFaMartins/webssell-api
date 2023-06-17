import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
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
}
