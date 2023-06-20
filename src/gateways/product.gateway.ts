import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AbstractGateway } from 'src/abstracts/gateways/abstract.gateway';
import { ItensService } from 'src/modules/itens/itens.service';
import { ProductEntity } from 'src/modules/products/database/products.entity';
import { ProductInputDTO } from 'src/modules/products/dtos/productsInput.dto';
import { ProductsService } from '../modules/products/products.service';

@WebSocketGateway()
export class ProductGateway extends AbstractGateway<ProductEntity> {
  constructor(
    private readonly productsService: ProductsService,
    private readonly itensService: ItensService,
  ) {
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

    this.itensService.findAll().then((itens) => {
      const filteredItens = itens.filter(
        (item) => item.productId !== productId,
      );
      client.broadcast.emit('refreshItensLIst', [...filteredItens]);
    });

    this.itensService.findPerProductId(productId).then((itens) => {
      itens.forEach((item) => {
        this.itensService.delete(item.itemId);
      });
      this.service.delete(productId);
    });

    this.logger.debug({ deletedProducId: productId });
  }
}
