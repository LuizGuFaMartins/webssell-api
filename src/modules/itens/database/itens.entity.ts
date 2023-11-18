import { OrderEntity } from 'src/modules/orders/database/orders.entity';
import { PaymentEntity } from 'src/modules/payments/database/payments.entity';
import { ProductEntity } from 'src/modules/products/database/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'itens' })
export class ItemEntity {
  @PrimaryGeneratedColumn()
  itemId: number;

  @Column()
  itemCode: string;

  @Column()
  itemQuantity: number;

  @Column()
  productId: number;

  @Column()
  orderId: number;

  @ManyToOne(() => ProductEntity, (product) => product.itens)
  @JoinColumn({ name: 'productId', referencedColumnName: 'productId' })
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.itens)
  @JoinColumn({ name: 'orderId', referencedColumnName: 'orderId' })
  order: OrderEntity;

}
