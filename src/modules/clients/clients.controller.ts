import { Body, Controller, Param, Patch, Post, Put } from '@nestjs/common';
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

  @Post('cadastro')
  @ApiBody({ type: ClientInputDTO })
  async create(@Body() client: ClientInputDTO): Promise<ClientEntity[]> {
    console.log("backend" + client.clientName);
    return await this.clientsService.create(client);
  }

  @Put(':id')
  @ApiBody({ type: ClientInputDTO })
  async update(
    @Param('id') id: string,
    @Body() client: ClientInputDTO,
  ): Promise<ClientEntity> {
    return await this.service.update(id, client);
  }
}
