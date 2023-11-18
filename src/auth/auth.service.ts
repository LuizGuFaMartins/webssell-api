import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from 'src/modules/clients/clients.service';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async signIn(clientEmail, clientPassword) {
    const client = await this.clientsService.findOneByEmail(clientEmail);
    if (client?.clientPassword !== clientPassword) {
      throw new UnauthorizedException();
    }
    const payload = {
      clientId: client.clientId,
      clientName: client.clientName,
      clientEmail: client.clientEmail,
      clientPassword: client.clientPassword,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      clientId: client.clientId,
    };
  }
}
