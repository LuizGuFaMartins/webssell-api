import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SocketAdapter } from './gateways/adapter';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, { cors: true });

  app.useWebSocketAdapter(new SocketAdapter(app));

  const logger: Logger = new Logger('Main');

  const config = new DocumentBuilder()
    .setTitle('Webssell-API')
    .setDescription(
      'This is an API that implements websockets for communication between the client and the server.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3333, () => logger.debug('Server is running at port 3333'));
}
bootstrap();
