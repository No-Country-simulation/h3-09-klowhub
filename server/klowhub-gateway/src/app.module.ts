import { MiddlewareConsumer, Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { StripeModule } from './stripe/stripe.module';
import { raw } from 'express';

import { AppsModule } from './apps/apps.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [UsersModule, AppsModule, CoursesModule, StripeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
