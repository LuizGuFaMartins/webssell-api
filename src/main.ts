import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const logger: Logger = new Logger('Main');

  const config = new DocumentBuilder()
    .setTitle('Webssell-API')
    .setDescription(
      'This is an API that implements websockets for communication between the client and the server.',
    )
    .setVersion('1.0')
    .addTag('Webssell')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3333, () => logger.debug('Server is running at port 3333'));
}
bootstrap();
