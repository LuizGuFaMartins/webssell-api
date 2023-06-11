import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { ClientEntity } from './database/clients.entity';
import { ClientDTO } from './dtos/clients.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<ClientEntity[]> {
    return await this.clientsService.findAll();
  }

  @Post()
  @ApiBody({ type: ClientDTO })
  async create(@Body() client: ClientDTO): Promise<ClientEntity> {
    return await this.clientsService.create(client);
  }
}
