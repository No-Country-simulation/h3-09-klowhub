import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ExceptionFilter } from './common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  });

  app.useGlobalFilters(new ExceptionFilter());

  await app.listen(envs.port);

  logger.log(`Client-Gateway running on port ${envs.port}`);
}
bootstrap();
