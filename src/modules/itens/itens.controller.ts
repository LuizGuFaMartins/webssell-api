import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ItemEntity } from './database/itens.entity';
import { ItemInputDTO } from './dtos/itensInput.dto';
import { ItensService } from './itens.service';

@Controller('itens')
export class ItensController {
  constructor(private readonly itensService: ItensService) {}

  @Get()
  async findAll(): Promise<ItemEntity[]> {
    return await this.itensService.findAll();
  }

  @Post()
  @ApiBody({ type: ItemInputDTO })
  async create(@Body() item: ItemInputDTO): Promise<ItemEntity> {
    return await this.itensService.create(item);
  }
}
