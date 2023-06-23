import { ClientEntity } from 'src/modules/clients/database/clients.entity';
import { ItemEntity } from 'src/modules/itens/database/itens.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../enums/order-status.enum';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column({ nullable: true })
  clientId: number;

  @OneToMany(() => OrderEntity, (order) => order.itens)
  itens: ItemEntity[];

  @Column({ nullable: true })
  orderTotalPrice: number;

  @Column({
    enum: OrderStatus,
    default: OrderStatus.OPEN,
  })
  orderStatus: string;

  @ManyToOne(() => ClientEntity, (client) => client.orders)
  @JoinColumn({ name: 'clientId', referencedColumnName: 'clientId' })
  client: ClientEntity;
}
