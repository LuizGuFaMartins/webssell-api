import { Client } from 'src/modules/clients/interfaces/clients.interface';

export interface Order {
  orderId: number;
  client: Client;
  orderObservation: string;
  orderTotalPrice: number;
  orderStatus: string;
}
