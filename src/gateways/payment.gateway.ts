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
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {
    super(paymentsService);
    this.setEntityName('Payment');
    this.setGetMethodName('refreshPaymentsList');
  }

  @SubscribeMessage('listPayments')
  list(@MessageBody() paymentId: number) {
    this.paymentsService.findPerClientId(paymentId).then((payment) => {
      this.emitListEvent(payment);
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
  delete(@ConnectedSocket() client: Socket, @MessageBody() paymentId: string) {
    this.paymentsService.findPerClientId(1).then((payment) => {
      const filteredItens = payment.filter(
        (pay) => pay.paymentId !== paymentId,
      );
      client.broadcast.emit('refreshItensList', [...filteredItens]);
    });

    this.service.delete(paymentId);

    this.logger.debug({ deletedPaymentId: paymentId });
  }
}
