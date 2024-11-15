import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'

import { KlowhubApiGatewayModule } from './klowhub-api-gateway.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(KlowhubApiGatewayModule)

  const PORT = process.env.PORT ?? 3001

  await app.listen(PORT)

  Logger.verbose(`Gateway listening in port: http://localhost:${PORT}`)
}
bootstrap()
