import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { envs } from 'src/config';

@Injectable()
export class UserService {
  private readonly client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: envs.userMicroserviceHost,
        port: envs.userMicroservicePort,
      },
    });
  }

  async checkCreatorExists(creatorId: string): Promise<boolean> {
    return firstValueFrom(this.client.send('check_creator_exists', { creatorId }));
  }
}
