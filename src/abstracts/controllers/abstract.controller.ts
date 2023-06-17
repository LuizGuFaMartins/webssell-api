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
    return this.service.findOne({ where: { [this.identifierName]: id } });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }

  abstract create(createDto: any): Promise<T>;
  abstract update(id: number, updateDto: any): Promise<T>;

  // @Post()
  // @ApiBody(this.getApiBodyOptions()) // Use o método para definir as opções de documentação da API
  // async create(@Body() createDto: any): Promise<T> {
  //   return this.service.create(createDto);
  // }

  // @Put(':id')
  // @ApiBody(this.getApiBodyOptions()) // Use o método para definir as opções de documentação da API
  // async update(@Param('id') id: number, @Body() updateDto: any): Promise<T> {
  //   return this.service.update(id, updateDto);
  // }
}
