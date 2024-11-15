import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { KlowhubApiGatewayController } from './klowhub-api-gateway.controller'
import { KlowhubApiGatewayService } from './klowhub-api-gateway.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'apps/klowhub-api-gateway/.env',
      isGlobal: true,
    }),
  ],
  controllers: [KlowhubApiGatewayController],
  providers: [KlowhubApiGatewayService],
})
export class KlowhubApiGatewayModule { }
