import { ClientEntity } from 'src/modules/clients/database/clients.entity';
import { ItemEntity } from 'src/modules/itens/database/itens.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column()
  orderStatus: string;
}
