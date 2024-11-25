import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from 'src/users-ms/dto';

@Controller('auth')
export class AuthController {
  httpService: any;

  constructor(
    @Inject('USER_SERVICE') private readonly authClient: ClientProxy,
  ) {}
  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    console.log('Logging in user with email:', email);
    return this.authClient.send({ cmd: 'login' }, { email, password });
  }
}
