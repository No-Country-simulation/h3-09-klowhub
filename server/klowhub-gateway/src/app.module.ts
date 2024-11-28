import { Module } from '@nestjs/common';
import { AppsModule } from './apps/apps.module';
import { UserMsModule } from './users-ms/users-ms.module';


@Module({
  imports: [UserMsModule, AppsModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}

