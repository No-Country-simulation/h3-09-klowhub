import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { envs, APP_SERVICE, COURSE_SERVICE, PAYMENT_SERVICE } from '../config';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ClientsModule.register([
      {
        name: APP_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.appHost,
          port: envs.appPort,
        }
      },
      {
        name: COURSE_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.courseHost,
          port: envs.coursePort,
        }
      },
      {
        name: PAYMENT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.paymentHost,
          port: envs.paymentPort
        }
      }
    ])
  ]
})
export class OrdersModule {}
