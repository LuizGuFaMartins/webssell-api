import { Logger, OnModuleInit } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AbstractService } from '../services/abstract.service';

@WebSocketGateway()
export class AbstractGateway<T>
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() public server: Server;
  public logger: Logger = new Logger('Gateway');
  private entityName: string;
  private getMethodName: string;

  constructor(public service: AbstractService<T>) {}

  setEntityName(entityName) {
    this.entityName = entityName;
  }

  setGetMethodName(getMethodName) {
    this.getMethodName = getMethodName;
  }

  handleConnection() {
    this.logger.log(`Connected to ${this.entityName} gateway`);
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.logger.log(`Connection id: ${socket.id}`);
      this.service.findAll().then((object: any) => {
        this.emitGetEvent(object);
      });
    });
  }

  handleDisconnect() {
    this.logger.log(`Disconnected from ${this.entityName} gateway`);
  }

  emitGetEvent(object) {
    this.server.emit(this.getMethodName, object);
  }
}
