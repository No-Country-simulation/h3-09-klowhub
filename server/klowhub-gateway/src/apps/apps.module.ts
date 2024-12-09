import { Module } from '@nestjs/common';
import { AppsController } from './apps.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
  controllers: [AppsController],
  imports: [
    ClientsModule.register([
      {
        name: 'APP_SERVICE',
        transport: Transport.TCP,
        options: {
          host: envs.appsMicroserviceHost,
          port: envs.appsMicroservicePort,
        },
      },
    ]),
  ],
})
export class AppsModule {}
