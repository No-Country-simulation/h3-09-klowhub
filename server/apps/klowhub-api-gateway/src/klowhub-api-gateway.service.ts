import { Injectable } from '@nestjs/common'

@Injectable()
export class KlowhubApiGatewayService {
  getHello(): string {
    return 'Hello World!'
  }
}
