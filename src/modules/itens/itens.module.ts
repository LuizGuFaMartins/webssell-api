import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './database/itens.entity';
import { ItensController } from './itens.controller';
import { ItensService } from './itens.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  controllers: [ItensController],
  providers: [ItensService],
})
export class ItensModule {}
