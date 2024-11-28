import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';

@Module({
  imports: [],
  controllers: [AppsController],
  providers: [AppsService],
})
export class AppsModule {}
