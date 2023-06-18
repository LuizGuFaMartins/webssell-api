import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
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
  create(@MessageBody() item: ItemInputDTO) {
    this.service.create(item);
    this.service.findAll().then((itens) => {
      this.emitListEvent(itens);
    });
    this.logger.debug(item);
  }
}
