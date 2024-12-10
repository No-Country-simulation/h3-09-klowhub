import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Main-Users');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: envs.userHost,
        port: envs.userPort,
      },
    },
  );
  await app.listen();
  logger.log(`Main-Users running on port ${envs.userHost}:${envs.userPort}`);
}
bootstrap();
