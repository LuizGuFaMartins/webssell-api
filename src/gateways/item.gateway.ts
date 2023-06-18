import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AbstractGateway } from 'src/abstracts/gateways/abstract.gateway';
import { ItemEntity } from 'src/modules/itens/database/itens.entity';
import { ItemInputDTO } from 'src/modules/itens/dtos/itensInput.dto';
import { ItensService } from 'src/modules/itens/itens.service';

@WebSocketGateway()
export class ItemGateway extends AbstractGateway<ItemEntity> {
  constructor(private readonly itensService: ItensService) {
    super(itensService);
    this.setEntityName('Item');
    this.setGetMethodName('refreshItensList');
  }

  @SubscribeMessage('listItens')
  list() {
    this.service.findAll().then((itens) => {
      this.emitListEvent(itens);
    });
  }

  @SubscribeMessage('createItem')
  create(@ConnectedSocket() client: Socket, @MessageBody() item: ItemInputDTO) {
    this.service.create(item);

    this.service.findAll().then((itens) => {
      client.broadcast.emit('refreshItensList', [...itens, item]);
    });

    this.logger.debug(item);
  }

  @SubscribeMessage('deleteItem')
  delete(@ConnectedSocket() client: Socket, @MessageBody() productId: number) {
    this.service.findAll().then((itens) => {
      const filteredItens = itens.filter(
        (prod) => prod.productId !== productId,
      );
      client.broadcast.emit('refreshItensList', [...filteredItens]);
    });

    this.service.delete(productId);

    this.logger.debug({ deletedProducId: productId });
  }
}
