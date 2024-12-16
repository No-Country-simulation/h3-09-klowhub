import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('payments-ms');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,  {
    transport: Transport.TCP,
    options: {
      port: envs.paymentPort,
      host: envs.paymnetHost,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen();

  logger.log(`Microservice running on port ${envs.paymnetHost}`);
}
bootstrap();
