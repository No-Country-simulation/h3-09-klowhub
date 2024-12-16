import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { PaymentsController } from './payments.controller';
import { envs, PAYMENT_SERVICE } from '../config';

@Module({
  controllers: [PaymentsController],
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.paymentsMicroserviceHost,
          port: envs.paymentsroservicePort,
        }
      }
    ])
  ]
})
export class PaymentsModule {}
