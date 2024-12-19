import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Main-Apps');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: envs.host,
        port: envs.port,
      },
    },
  );
  await app.listen();
  logger.log(`Main-Apps running on port ${envs.host}:${envs.port}`);
}
bootstrap();
