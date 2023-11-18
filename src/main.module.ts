import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { GatewayModule } from './gateways/gateway.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ItensModule } from './modules/itens/itens.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ProductsModule } from './modules/products/products.module';

dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION, // aws region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // aws access key id
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // aws secret access key
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
          name: process.env.QUEUE_NAME, // name of the queue
          queueUrl: process.env.QUEUE_URL,
          region: process.env.AWS_REGION, // url of the queue
        },
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
