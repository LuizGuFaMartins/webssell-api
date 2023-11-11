import { ClientEntity } from 'src/modules/clients/database/clients.entity';
import { OrderEntity } from 'src/modules/orders/database/orders.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'payments' })
export class PaymentEntity {
  @PrimaryColumn()
  paymentId: string;

  @Column()
  paymentName: string;

  @Column()
  paymentCpf: string;

  @Column()
  paymentPrice: string;

  @Column()
  paymentStatus: string;

  @Column()
  paymentQrCode: string;

  @Column()
  paymentCreatedAt: Date;

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
