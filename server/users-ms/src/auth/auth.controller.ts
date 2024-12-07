import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login-user.dto';

@Controller()
export class AuthController {
  httpService: any;
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() { email, password }: LoginDto) {
    console.log('Microservicio: Procesando login para:', email);
    return this.authService.login(email, password);
  }

}
