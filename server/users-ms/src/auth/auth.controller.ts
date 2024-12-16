import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller()
export class AuthController {
  httpService: any;
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(@Payload() { email, password }: LoginDto) {
    // console.log('Microservicio: Procesando login para:', email);
    return this.authService.login(email, password);
  }
  @MessagePattern('validate_token')
  async validateToken(@Payload() token: string): Promise<User | null> {
    // console.log('Microservicio: Validando token');
    return this.authService.validateToken(token);
  }
}
