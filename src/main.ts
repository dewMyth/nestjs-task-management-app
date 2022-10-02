import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('Application Bootstrapping');
  const app = await NestFactory.create(AppModule);

  //Enable CORS to allow requests from other domains
  // app.enableCors();
  if (process.env.NODE_ENV == 'development') {
    app.enableCors();
  }

  const serverConfig = config.get('server');
  console.log(serverConfig);

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
