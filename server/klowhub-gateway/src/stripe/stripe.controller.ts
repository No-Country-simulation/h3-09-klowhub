import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import {
  CreateCheckoutSessionDto,
  CreateCustomerDto,
  CreateCustomerPortalUrlDto,
  CreateSubscriptionDto,
} from '../../../app-payments/src/stripe/dto';

import { CreateCustomerResponse } from '../../../app-payments/src/stripe/interfaces/stripe.interface';
import { CreateAccountDto } from '../../../app-payments/src/stripe/dto/create-account.dto';
import { firstValueFrom } from 'rxjs';

@Controller('stripe')
export class StripeController {
  constructor(
    @Inject('PAYMENTS_SERVICE') private readonly paymentsService: ClientProxy,
  ) { }

  @Post('webhook')
  async handleStripeWebhook(
    @Body() body: Buffer,
    @Headers('stripe-signature') signature: string,
  ): Promise<void> {
    try {
      await this.paymentsService
        .send<void>('stripe.webhook', { body, signature })

    } catch (err) {
      console.error('⚠️  Error handling Stripe webhook.', err.message);
      throw new BadRequestException('Invalid Stripe webhook signature.');
    }
  }

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() createCheckoutSession: CreateCheckoutSessionDto,
  ) {
    return firstValueFrom(this.paymentsService
      .send<{ url: string }>('stripe.create-checkout-session', createCheckoutSession))

  }

  @Post('create-subscription')
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.paymentsService
      .send('stripe.create-subscription', createSubscriptionDto)
  }

  @Post('create-customer')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    return this.paymentsService
      .send<CreateCustomerResponse>('stripe.create-customer', createCustomerDto)
  }

  @Post('customer-portal')
  async getCustomerPortalUrl(
    @Body() createCustomerPortalUrlDto: CreateCustomerPortalUrlDto,
  ) {
    return this.paymentsService
      .send<{ url: string }>('stripe.customer-portal', createCustomerPortalUrlDto)
  }

  @Post('create-account')
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.paymentsService
      .send('stripe.create-account', createAccountDto)

  }
}
