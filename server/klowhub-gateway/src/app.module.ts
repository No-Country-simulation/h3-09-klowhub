import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { UserMsModule } from './users-ms/users-ms.module';
import { AppsModule } from './apps-ms/apps.module';

@Module({
<<<<<<< HEAD
  imports: [AppsModule, CoursesModule],
=======
  imports: [UserMsModule, AppsModule, CoursesModule],
>>>>>>> dev
  controllers: [],
  providers: [],
})
export class AppModule {}
