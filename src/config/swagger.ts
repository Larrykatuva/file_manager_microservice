import { DocumentBuilder } from '@nestjs/swagger';

/**
 * Swagger configuration settings.
 */
const config = new DocumentBuilder()
  .setTitle('FILE MANAGER MICROSERVICE')
  .setDescription(
    'This service is made to store and manage files for celica organization',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();
export default config;
