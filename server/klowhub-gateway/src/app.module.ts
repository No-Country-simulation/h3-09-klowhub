import { Module } from '@nestjs/common';
import { AppsModule } from './apps/apps.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [UsersModule, AppsModule, CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
