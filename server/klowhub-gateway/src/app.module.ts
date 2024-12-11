import { Module } from '@nestjs/common';

import { CoursesModule } from './courses/courses.module';
import { OrdersModule } from './orders/orders.module';
import { AppsModule } from './apps-ms/apps.module';
import { UserMsModule } from './users-ms/users-ms.module';

@Module({
  imports: [UserMsModule, AppsModule, CoursesModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
