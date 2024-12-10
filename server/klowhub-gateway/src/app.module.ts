import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { AppsModule } from './apps-ms/apps.module';
import { UserMsModule } from './users-ms/users-ms.module';

@Module({
  imports: [UserMsModule, AppsModule, CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
