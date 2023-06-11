import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientEntity } from './database/clients.entity';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<ClientEntity[]> {
    return await this.clientsService.findAll();
  }

  @Post()
  async create(@Body() client: ClientEntity): Promise<ClientEntity[]> {
    return await this.clientsService.findAll();
  }
}
