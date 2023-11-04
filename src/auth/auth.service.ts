import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
import { ClientsService } from 'src/modules/clients/clients.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService
  ) {}

  async signIn(clientEmail, clientPassword) {
    const client = await this.clientsService.findOne(clientEmail);
    if (client?.clientPassword !== clientPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: client.clientId, username: client.clientName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}