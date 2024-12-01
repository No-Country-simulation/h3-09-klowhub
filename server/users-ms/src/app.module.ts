import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
