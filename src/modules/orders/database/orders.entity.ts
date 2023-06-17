import { ClientEntity } from 'src/modules/clients/database/clients.entity';
import { ItemEntity } from 'src/modules/itens/database/itens.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(() => ClientEntity, (client) => client.clientId)
  client: ClientEntity;

  @OneToMany(() => ItemEntity, (order) => order.itemId)
  itens: ItemEntity[];

  @Column()
  orderTotalPrice: number;

  @Column({
    enum: OrderStatus,
    default: OrderStatus.OPEN,
  })
  orderStatus: string;
}
