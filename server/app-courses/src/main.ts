import { NestFactory } from '@nestjs/core';
import { CoursesModule } from './courses/courses.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './config/envs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main-Courses');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CoursesModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port,
      },
    },
  );
  await app.listen();
  logger.log(`Main-Courses running on port ${envs.port}`);
}
bootstrap();
