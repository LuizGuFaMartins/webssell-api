import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
import { ItemEntity } from './database/itens.entity';

@Injectable()
export class ItensService extends AbstractService<ItemEntity> {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {
    super();
    this.setRepository(itemRepository);
  }

  async findOne(id: any): Promise<ItemEntity> {
    return this.itemRepository.findOne({
      where: { itemId: id },
    });
  }
}
