import { ApiProperty } from '@nestjs/swagger';

export class ClientDTO {
  @ApiProperty()
  clientId: number;

  @ApiProperty()
  clientName: string;
}
