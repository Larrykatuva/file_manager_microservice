import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import SwaggerConfig from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  /**
   * Swagger documentation configuration
   */
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, document);

  /**
   * Enabling validation pipes globally
   */
  app.useGlobalPipes(new ValidationPipe());

  // await app.startAllMicroservices();

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
