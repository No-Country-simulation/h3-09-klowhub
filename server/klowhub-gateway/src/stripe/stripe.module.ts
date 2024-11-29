import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { StripeController } from './stripe.controller';
import { envs } from '../config';

@Module({
  controllers: [StripeController],
  imports: [
    ClientsModule.register([
      {
        name: 'APP_SERVICE',
        transport: Transport.TCP,
        options: {
          host: envs.paymentsMicroserviceHost,
          port: envs.paymentsroservicePort,
        },
      },
    ]),
  ],
})
export class StripeModule { }