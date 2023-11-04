import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GatewayModule } from './gateways/gateway.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ItensModule } from './modules/itens/itens.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    ItensModule,
    ClientsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GatewayModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule {}
