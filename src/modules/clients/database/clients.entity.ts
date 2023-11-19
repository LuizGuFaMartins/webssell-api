import { OrderEntity } from 'src/modules/orders/database/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  clientId: number;

  @Column()
  clientName: string;

  @Column()
  clientCpf: string;

  @Column()
  clientEmail: string;

  @Column()
  clientPassword: string;

  @OneToMany(() => OrderEntity, (order) => order.clientId)
  orders: OrderEntity[];
}
