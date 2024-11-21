import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AppsModule } from './apps/apps.module';

@Module({
  imports: [UsersModule, AppsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

