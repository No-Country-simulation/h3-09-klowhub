import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
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
    return this.authClient.send('login', { email, password });
  }
  @Get('validate_token/:token')
  validateToken(@Param('token') token: string) {
    console.log('Gateway: Validando token');
    return this.authClient.send('validate_token', token);
  }
}
