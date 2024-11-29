import { Module } from '@nestjs/common';
import { StripeController } from '../../../app-payments/src/stripe/stripe.controller';

@Module({
  imports: [],
  controllers: [StripeController],
  providers: [],
})
export class StripeModule { }
