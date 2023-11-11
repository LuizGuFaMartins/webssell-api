import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GatewayModule } from './gateways/gateway.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ItensModule } from './modules/itens/itens.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import * as AWS from 'aws-sdk';
import { SqsModule } from '@ssut/nestjs-sqs';
import { PaymentsModule } from './modules/payments/payments.module';

AWS.config.update({
  region: "", // aws region
  accessKeyId: "", // aws access key id
  secretAccessKey: "", // aws secret access key
});
@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    ItensModule,
    ClientsModule,
    PaymentsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GatewayModule,
    AuthModule,
    SqsModule.register({
      consumers: [],
      producers: [
          {
              name: "", // name of the queue
              queueUrl: "",
              region: "", // url of the queue
          },
      ],
  }),
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
