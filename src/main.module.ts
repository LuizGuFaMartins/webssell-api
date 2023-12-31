import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from './gateways/gateway.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ItensModule } from './modules/itens/itens.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ClientsModule,
    ProductsModule,
    OrdersModule,
    ItensModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
