import { ClientEntity } from 'src/modules/clients/database/clients.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(() => ClientEntity, (client) => client.clientId)
  client: ClientEntity;

  @Column()
  orderObservation: string;

  @Column()
  orderTotalPrice: number;

  @Column()
  orderStatus: string;
}
