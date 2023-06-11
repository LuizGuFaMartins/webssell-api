import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './database/clients.entity';
import { ClientInputDTO } from './dtos/clientsInput.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
  ) {}

  async findAll(): Promise<ClientEntity[]> {
    return await this.clientRepository.find();
  }

  async create(client: ClientInputDTO): Promise<ClientEntity> {
    const entity: ClientEntity = new ClientEntity();
    entity.clientName = client.clientName;
    return await this.clientRepository.save(entity);
  }
}
