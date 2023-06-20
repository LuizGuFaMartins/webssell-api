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
      this.itensService.findPerOpenOrderClientId(1).then((object: any) => {
        this.emitListEvent(object);
      });
    });
  }

  @SubscribeMessage('listItens')
  list() {
    this.itensService.findPerOpenOrderClientId(1).then((itens) => {
      this.emitListEvent(itens);
    });
  }

  @SubscribeMessage('createItem')
  create(
    @ConnectedSocket() client: Socket,
    @MessageBody() item: ItensInputWithClientDTO,
  ) {
    this.itensService.createWithOpenOrder(item);

    this.itensService.findPerOpenOrderClientId(1).then((itens) => {
      client.broadcast.emit('refreshItensList', [...itens, item]);
    });

    this.logger.debug(item);
  }

  @SubscribeMessage('deleteItem')
  delete(@ConnectedSocket() client: Socket, @MessageBody() productId: number) {
    this.itensService.findPerOpenOrderClientId(1).then((itens) => {
      const filteredItens = itens.filter(
        (prod) => prod.productId !== productId,
      );
      client.broadcast.emit('refreshItensList', [...filteredItens]);
    });

    this.service.delete(productId);

    this.logger.debug({ deletedProducId: productId });
  }
}
