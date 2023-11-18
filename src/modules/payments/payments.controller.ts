import { Body, Controller, Param, Post, Put, Get } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AbstractController } from 'src/abstracts/controllers/abstract.controller';
import { PaymentInputDTO } from 'src/modules/payments/dtos/paymentsInput.dto';
import { PaymentEntity } from './database/payments.entity';
import { PaymentsService } from './payments.service';
@ApiTags('Payments')
@Controller('payment')
export class PaymentsController extends AbstractController<PaymentEntity> {
  constructor(private readonly paymentsService: PaymentsService) {
    super(paymentsService);
    this.setIdentifierName('paymentId');
  }

  @Post()
  @ApiBody({ type: PaymentInputDTO })
  async create(@Body() payment: PaymentInputDTO): Promise<PaymentEntity[]> {
    return await this.paymentsService.create(payment);
  }

  @Get('/find-per-client/:id')
  async findPerClient(@Param('id') id: number): Promise<PaymentEntity[]> {
    return await this.paymentsService.findPerClientId(id);
  }

  @Put(':id')
  @ApiBody({ type: PaymentInputDTO })
  async update(
    @Param('id') id: number,
    @Body() payment: PaymentInputDTO,
  ): Promise<PaymentEntity> {
    return await this.service.update(id, payment);
  }
}
