import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import { UsersController } from './user/users.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  controllers: [AuthController,UsersController],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: envs.usersMicroserviceHost,
          port: envs.usersMicroservicePort,
        },
      },
    ]),
  ],
})

export class UserMsModule {}
