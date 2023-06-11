import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from './database/itens.entity';

@Injectable()
export class ItensService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async findAll(): Promise<ItemEntity[]> {
    return await this.itemRepository.find();
  }

  async create(client: ItemEntity): Promise<ItemEntity> {
    return await this.itemRepository.save(client);
  }
}
