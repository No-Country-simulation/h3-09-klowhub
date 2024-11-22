import { Body, Controller, Post } from '@nestjs/common'

import Stripe from 'stripe'

import { StripeService } from './stripe.service'
import {
  CreateCheckoutSessionDto,
  CreateCustomerDto,
  CreateCustomerPortalUrlDto,
  CreateSubscriptionDto,
} from './dto'

import { CreateCustomerResponse } from './interfaces/stripe.interface'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('Stripe Module')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() createCheckoutSession: CreateCheckoutSessionDto,
  ): Promise<{ url: string }> {
    return await this.stripeService.createCheckoutSession(createCheckoutSession)
  }

  @ApiBearerAuth()
  @Post('create-subscription')
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    return await this.stripeService.createSubscription(createSubscriptionDto)
  }

  // todo: customers
  //* use in create or update user
  @Post('create-customer')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CreateCustomerResponse> {
    return await this.stripeService.createCustomer(createCustomerDto)
  }

  @Post('customer-portal')
  async getCustomerPortalUrl(
    @Body() createCustomerPortalUrlDto: CreateCustomerPortalUrlDto,
  ): Promise<{ url: string }> {
    return await this.stripeService.getCustomerPortalUrl(
      createCustomerPortalUrlDto,
    )
  }
}
