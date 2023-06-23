import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AbstractController } from 'src/abstracts/controllers/abstract.controller';
import { ItemEntity } from './database/itens.entity';
import { ItemInputDTO } from './dtos/itensInput.dto';
import { ItensInputWithClientDTO } from './dtos/itensInputWithClient.dto';
import { ItensService } from './itens.service';

@ApiTags('Itens')
@Controller('itens')
export class ItensController extends AbstractController<ItemEntity> {
  constructor(private readonly itensService: ItensService) {
    super(itensService);
    this.setIdentifierName('itemId');
  }

  @Get('/find-per-open-order/:clientId')
  async findPerClient(
    @Param('clientId') clientId: number,
  ): Promise<ItemEntity[]> {
    return await this.itensService.findPerOpenOrderClientId(clientId);
  }

  @Post()
  @ApiBody({ type: ItemInputDTO })
  async create(@Body() item: ItemInputDTO): Promise<ItemEntity[]> {
    return await this.service.create(item);
  }

  @Post('open-client-order/')
  @ApiBody({ type: ItensInputWithClientDTO })
  async createPerOpenClientOrder(
    @Body() item: ItensInputWithClientDTO,
  ): Promise<ItemEntity> {
    return await this.itensService.createWithOpenOrder(item);
  }

  @Put()
  @ApiBody({ type: ItemInputDTO })
  async update(
    @Param('id') id: number,
    @Body() item: ItemInputDTO,
  ): Promise<ItemEntity> {
    return await this.service.update(id, item);
  }
}
