import { Module } from '@nestjs/common';

import { UserMsModule } from './users-ms/users-ms.module';

import { AppsModule } from './apps/apps.module';
import { CoursesModule } from './courses/courses.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UserMsModule, AppsModule, CoursesModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
