import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from './database/itens.entity';
import { ItemInputDTO } from './dtos/itensInput.dto';

@Injectable()
export class ItensService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async findAll(): Promise<ItemEntity[]> {
    return await this.itemRepository.find();
  }

  async create(item: ItemInputDTO): Promise<ItemEntity> {
    const entity: ItemEntity = new ItemEntity();
    entity.itemPrice = item.itemPrice;
    entity.itemQuantity = item.itemPrice;
    return await this.itemRepository.save(entity);
  }
}
