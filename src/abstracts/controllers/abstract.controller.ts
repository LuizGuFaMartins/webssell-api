import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AbstractService } from '../services/abstract.service';

@Controller()
export abstract class AbstractController<T> {
  private identifierName;
  constructor(public service: AbstractService<T>) {}

  setIdentifierName(identifierName) {
    this.identifierName = identifierName;
  }

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<T> {
    return this.service.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }
}
