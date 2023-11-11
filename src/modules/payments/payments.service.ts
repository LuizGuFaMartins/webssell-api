import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/abstracts/services/abstract.service';
import { Repository } from 'typeorm';
import { PaymentEntity } from './database/payments.entity';

@Injectable()
export class PaymentsService extends AbstractService<PaymentEntity> {
  constructor(
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
  ) {
    super();
    this.setRepository(paymentRepository);
  }

  async findPerClientId(id: any): Promise<PaymentEntity[]> {
    return this.paymentRepository.find({
      where: { clientId: id },
    });
  }
  
  async findOne(id: any): Promise<PaymentEntity> {
    return this.paymentRepository.findOne({
      where: { paymentId: id },
    });
  }
}
