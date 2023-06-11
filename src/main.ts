import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  const config = new DocumentBuilder()
    .setTitle('Webssell-API')
    .setDescription('This is an API that implements websockets for communication between the client and the server.')
    .setVersion('1.0')
    .addTag('Webssell')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
