import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './products.controller';
import { ClientsService } from './products.service';
import { ClientEntity } from './database/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ClientEntity
  ])],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule { }
