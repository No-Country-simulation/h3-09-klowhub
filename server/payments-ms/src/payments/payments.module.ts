import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { envs, ORDER_SERVICE } from '../config';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.orderHost,
          port: envs.orderPort,
        }
      },
    ])
  ]
})
export class PaymentsModule {}
