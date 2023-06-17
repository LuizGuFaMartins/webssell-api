import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AbstractController } from 'src/abstracts/controllers/abstract.controller';
import { ClientsService } from './clients.service';
import { ClientEntity } from './database/clients.entity';
import { ClientInputDTO } from './dtos/clientsInput.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController extends AbstractController<ClientEntity> {
  constructor(private readonly clientsService: ClientsService) {
    super(clientsService);
    this.setIdentifierName('clientId');
  }

  @Post()
  @ApiBody({ type: ClientInputDTO })
  async create(@Body() client: ClientInputDTO): Promise<ClientEntity> {
    return await this.clientsService.create(client);
  }

  @Put()
  @ApiBody({ type: ClientInputDTO })
  update(id: number, client: ClientInputDTO): Promise<ClientEntity> {
    return this.service.update(id, client);
  }
}
