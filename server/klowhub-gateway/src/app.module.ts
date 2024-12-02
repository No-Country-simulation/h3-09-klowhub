import { MiddlewareConsumer, Module } from '@nestjs/common';

import { UserMsModule } from './users-ms/users-ms.module';
import { StripeModule } from './stripe/stripe.module';
import { raw } from 'express';

import { AppsModule } from './apps/apps.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [UserMsModule, AppsModule, CoursesModule, StripeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
