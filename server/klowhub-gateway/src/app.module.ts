import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { AppsModule } from './apps-ms/apps.module';

@Module({
  imports: [UsersModule, AppsModule, CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
