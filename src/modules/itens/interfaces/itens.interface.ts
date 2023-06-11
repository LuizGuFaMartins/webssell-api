import { Order } from 'src/modules/orders/interfaces/orders.interface';
import { Product } from 'src/modules/products/interfaces/products.interface';

export interface Item {
  itemId: number;
  itemQuantity: number;
  itemPrice: number;
  order: Order;
  productId: Product;
}
