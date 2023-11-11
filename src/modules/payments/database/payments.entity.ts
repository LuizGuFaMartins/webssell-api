import { ClientEntity } from 'src/modules/clients/database/clients.entity';
import { ItemEntity } from 'src/modules/itens/database/itens.entity';
import { OrderEntity } from 'src/modules/orders/database/orders.entity';

import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payments' })
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column()
  paymentName: string;

  @Column()
  paymentCpf: string;

  @Column()
  paymentPrice: number;

  @Column()
  paymentstatus: string;

  @Column()
  paymentqrcode: string;

  @Column()
  paymenttimestamp: number;

  @Column()
  clientId: number;

  @Column()
  orderId: number;

  @ManyToOne(() => ClientEntity, (client) => client.clientId)
  @JoinColumn({ name: 'clientId', referencedColumnName: 'clientId' })
  client: ClientEntity;

  @ManyToOne(() => OrderEntity, (order) => order.itens)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'orderId' })
  order: OrderEntity;
}
