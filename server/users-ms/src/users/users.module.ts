import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { UserService } from './users.service';
import { UserController } from './users.controller';
import { envs, PAYMENT_SERVICE } from '../config';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_SERVICE,
        transport: Transport.TCP,
        options: {
          port: envs.paymentPort,
          host: envs.paymentHost
        }
      }
    ])
  ]
})
export class UserModule {}
//
