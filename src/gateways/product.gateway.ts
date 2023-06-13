import { Logger, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ProductInputDTO } from 'src/modules/products/dtos/productsInput.dto';
import { ProductsService } from '../modules/products/products.service';

@WebSocketGateway()
export class ProductGateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() private server: Server;
  private logger: Logger = new Logger('Gateway');

  constructor(private readonly productsService: ProductsService) {}

  handleConnection(client: any, ...args: any[]) {
    this.logger.log('Connected to products gateway');
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.log(`Connection id: ${socket.id}`);
      this.productsService.findAll().then((products) => {
        this.server.emit('getProducts', products);
      });
    });
  }

  handleDisconnect(client: any) {
    this.logger.log('Disconnected from products gateway');
  }

  @SubscribeMessage('createProduct')
  onCreateProduct(@MessageBody() product: ProductInputDTO) {
    this.productsService.create(product);
    this.productsService.findAll().then((products) => {
      this.server.emit('getProducts', products);
    });
    this.logger.debug(product);
  }
}
