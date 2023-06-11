import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientEntity } from './database/clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    ClientEntity
  ])],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule { }
