import { ItemEntity } from 'src/modules/itens/database/itens.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  productName: string;

  @Column()
  productPrice: number;

  @Column()
  productCode: string;

  @OneToMany(() => ItemEntity, (item) => item.productId)
  itens: ItemEntity[];
}
