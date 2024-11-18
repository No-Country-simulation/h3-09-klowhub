import { Module } from '@nestjs/common';
import { AppsModule } from './apps/apps.module';


@Module({
  imports: [AppsModule],

})
export class AppModule {}
