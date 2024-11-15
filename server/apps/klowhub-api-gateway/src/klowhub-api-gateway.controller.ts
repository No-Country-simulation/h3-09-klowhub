import { Controller, Get } from '@nestjs/common'
import { KlowhubApiGatewayService } from './klowhub-api-gateway.service'

@Controller()
export class KlowhubApiGatewayController {
  constructor(
    private readonly klowhubApiGatewayService: KlowhubApiGatewayService,
  ) { }

  @Get()
  getHello(): string {
    return this.klowhubApiGatewayService.getHello()
  }
}
