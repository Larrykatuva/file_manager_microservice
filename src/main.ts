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

  app.useGlobalPipes();
  /**
   * Enabling validation pipes globally
   */
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors();

  // await app.startAllMicroservices();
  /**
   * Enable cors
   */
  app.enableCors();

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
