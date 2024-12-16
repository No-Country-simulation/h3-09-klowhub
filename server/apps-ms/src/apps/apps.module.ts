import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [AppsController],
  providers: [AppsService, UserService],
})
export class AppsModule {}
