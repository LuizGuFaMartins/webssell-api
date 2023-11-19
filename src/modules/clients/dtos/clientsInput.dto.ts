import { ApiProperty } from '@nestjs/swagger';

export class ClientInputDTO {
  @ApiProperty()
  clientName: string;

  @ApiProperty()
  clientEmail: string;

  @ApiProperty()
  clientCpf: string;

  @ApiProperty()
  clientPassword: string;
}
