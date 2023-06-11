import { OrderEntity } from 'src/modules/orders/database/orders.entity';
import { ProductEntity } from 'src/modules/products/database/products.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn()
  itemId: number;

  @Column()
  itemQuantity: number;

  @Column()
  itemPrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderId)
  order: OrderEntity;

  @OneToOne(() => ProductEntity, (product) => product.productId)
  product: ProductEntity;
}
