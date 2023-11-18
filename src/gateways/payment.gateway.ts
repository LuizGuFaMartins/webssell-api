import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AbstractGateway } from 'src/abstracts/gateways/abstract.gateway';
import { PaymentEntity } from 'src/modules/payments/database/payments.entity';
import { PaymentInputDTO } from 'src/modules/payments/dtos/paymentsInput.dto';
import { PaymentsService } from 'src/modules/payments/payments.service';

@WebSocketGateway()
export class PaymentGateway extends AbstractGateway<PaymentEntity> {
  constructor(private readonly paymentsService: PaymentsService) {
    super(paymentsService);
    this.setEntityName('Payment');
    this.setGetMethodName('refreshPaymentsList');
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.log(`Connection id: ${socket.id}`);
    });
  }

  @SubscribeMessage('listPayments')
  list(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { clientId: number },
  ) {
    this.paymentsService.findPerClientId(payload.clientId).then((payments) => {
      this.emitListEvent(payments);
    });
  }

  @SubscribeMessage('createPayment')
  create(
    @ConnectedSocket() client: Socket,
    @MessageBody() payment: PaymentInputDTO,
  ) {
    this.service.create(payment);

    this.service.findAll().then((payments) => {
      client.broadcast.emit('refreshPaymentsList', [...payments, payment]);
    });

    this.logger.debug(payment);
  }

  @SubscribeMessage('deletePayment')
  delete(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { paymentId: string; clientId: number },
  ) {
    this.paymentsService.findPerClientId(payload.clientId).then((payment) => {
      const filteredItens = payment.filter(
        (pay) => pay.paymentId !== payload.paymentId,
      );
      client.broadcast.emit('refreshItensList', [...filteredItens]);
    });

    this.service.delete(payload.paymentId);

    this.logger.debug({ deletedPaymentId: payload.paymentId });
  }
}
