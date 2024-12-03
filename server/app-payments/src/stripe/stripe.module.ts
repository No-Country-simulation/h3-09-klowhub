import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { StripeService } from './stripe.service'
import { StripeController } from './stripe.controller'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [
        ConfigModule.forRoot(),
        ClientsModule.register([
          {
            name: 'ORDERS_SERVICE',
            transport: Transport.TCP,
            options: {
              host: 'localhost',
              port: 3005,
            },
          },
        ]),
      ],
      providers: [
        StripeService,
        {
          provide: 'STRIPE_SECRET_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.get('STRIPE_SECRET_KEY'),
          inject: [ConfigService],
        },
      ],
    }
  }
}
