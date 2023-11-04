import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from 'src/modules/clients/clients.service';
import { ClientEntity } from 'src/modules/clients/database/clients.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10m' },
    }),
    TypeOrmModule.forFeature([ClientEntity]),
  ],
  providers: [AuthService, ClientsService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
