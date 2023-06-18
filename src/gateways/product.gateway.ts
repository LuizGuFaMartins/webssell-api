import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AbstractGateway } from 'src/abstracts/gateways/abstract.gateway';
import { ProductEntity } from 'src/modules/products/database/products.entity';
import { ProductInputDTO } from 'src/modules/products/dtos/productsInput.dto';
import { ProductsService } from '../modules/products/products.service';

@WebSocketGateway()
export class ProductGateway extends AbstractGateway<ProductEntity> {
  constructor(private readonly productsService: ProductsService) {
    super(productsService);
    this.setEntityName('Product');
    this.setGetMethodName('refreshProductsList');
  }

  @SubscribeMessage('listProducts')
  list() {
    this.service.findAll().then((itens) => {
      this.emitListEvent(itens);
    });
  }

  @SubscribeMessage('createProduct')
  create(
    @ConnectedSocket() client: Socket,
    @MessageBody() product: ProductInputDTO,
  ) {
    this.service.create(product);

    this.service.findAll().then((products) => {
      client.broadcast.emit('refreshProductsList', [...products, product]);
    });

    this.logger.debug(product);
  }

  @SubscribeMessage('deleteProduct')
  delete(@ConnectedSocket() client: Socket, @MessageBody() productId: number) {
    this.service.findAll().then((products) => {
      const filteredProducts = products.filter(
        (prod) => prod.productId !== productId,
      );
      client.broadcast.emit('refreshProductsList', [...filteredProducts]);
    });

    this.service.delete(productId);

    this.logger.debug({ deletedProducId: productId });
  }
}
