import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AbstractGateway } from 'src/abstracts/gateways/abstract.gateway';
import { ItemEntity } from 'src/modules/itens/database/itens.entity';
import { ItensInputWithClientDTO } from 'src/modules/itens/dtos/itensInputWithClient.dto';
import { ItensService } from 'src/modules/itens/itens.service';

@WebSocketGateway()
export class ItemGateway extends AbstractGateway<ItemEntity> {
  constructor(private readonly itensService: ItensService) {
    super(itensService);
    this.setEntityName('Item');
    this.setGetMethodName('refreshItensList');
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.log(`Connection id: ${socket.id}`);
    });
  }

  @SubscribeMessage('listItens')
  list(client, payload: { clientId: number }) {
    const clientId = payload.clientId;
    this.itensService.findPerOpenOrderClientId(clientId).then((itens) => {
      this.emitListEvent(itens);
    });
  }

  @SubscribeMessage('createItem')
  create(
    @ConnectedSocket() client: Socket,
    @MessageBody() item: ItensInputWithClientDTO,
  ) {
    this.itensService.createWithOpenOrder(item);

    this.itensService.findPerOpenOrderClientId(item.clientId).then((itens) => {
      client.broadcast.emit('refreshItensList', [...itens, item]);
    });

    this.logger.debug(item);
  }

  @SubscribeMessage('deleteItem')
  delete(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { productId: number; clientId: number },
  ) {
    this.itensService
      .findPerOpenOrderClientId(payload.clientId)
      .then((itens) => {
        const filteredItens = itens.filter(
          (prod) => prod.productId !== payload.productId,
        );
        client.broadcast.emit('refreshItensList', [...filteredItens]);
      });

    this.service.delete(payload.productId);

    this.logger.debug({ deletedProducId: payload.productId });
  }
}
