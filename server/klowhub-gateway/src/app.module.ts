import { MiddlewareConsumer, Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { StripeModule } from './stripe/stripe.module';
import { raw } from 'express';


@Module({
  imports: [StripeModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
