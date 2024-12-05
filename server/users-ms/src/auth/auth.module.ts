import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [UserModule], 
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
