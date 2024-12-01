import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

import {
  CreateCheckoutSessionDto,
  CreateCustomerDto,
  CreateCustomerPortalUrlDto,
  CreateSubscriptionDto,
  CreateAccountDto
} from './dto';

import { CreateCustomerResponse } from './interfaces/stripe.interface';
import { Request } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(
    @Inject('APP_SERVICE') private readonly appClient: ClientProxy
  ) { }

  @Post('webhook')
  async handleStripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {

    const payload = req.rawBody

    try {
      return this.appClient
        .send('stripe.webhook', { body: payload, signature })
    } catch (err) {
      throw new BadRequestException('Invalid Stripe webhook signature.');
    }
  }

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() createCheckoutSession: CreateCheckoutSessionDto,
  ) {
    return this.appClient
      .send<{ url: string }>('stripe.create-checkout-session', createCheckoutSession)
  }

  @Post('create-subscription')
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    return this.appClient
      .send('stripe.create-subscription', createSubscriptionDto)
  }

  @Post('create-customer')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    return this.appClient
      .send<CreateCustomerResponse>('stripe.create-customer', createCustomerDto)
  }

  @Post('customer-portal')
  async getCustomerPortalUrl(
    @Body() createCustomerPortalUrlDto: CreateCustomerPortalUrlDto,
  ) {
    return this.appClient
      .send<{ url: string }>('stripe.customer-portal', createCustomerPortalUrlDto)
  }

  @Post('create-account')
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.appClient
      .send('stripe.create-account', createAccountDto)
  }

  @Get()
  hello() {
    return 'hello'
  }
}
