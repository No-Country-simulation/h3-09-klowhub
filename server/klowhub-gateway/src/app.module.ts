import { Module } from '@nestjs/common';
import { AppsModule } from './apps/apps.module';
import { CoursesModule } from './courses/courses.module';
import { UserMsModule } from './users-ms/users-ms.module';

@Module({
  imports: [UserMsModule, AppsModule, CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
