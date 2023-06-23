import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class AbstractService<T> {
  protected repository: Repository<T>;

  setRepository(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  abstract findOne(id: any): Promise<T>;

  async create(createDto: any): Promise<T[]> {
    const entity = await this.repository.create(createDto);
    const savedEntity = await this.repository.save(entity);
    return savedEntity;
  }

  async update(id: any, updateDto: any): Promise<T> {
    const entity = await this.findOne(id);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    this.repository.merge(entity, updateDto);
    return this.repository.save(entity);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}
