import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
} from '@nestjs/common'

import Stripe from 'stripe'

import { StripeService } from './stripe.service'
import {
  CreateCheckoutSessionDto,
  CreateCustomerDto,
  CreateCustomerPortalUrlDto,
  CreateSubscriptionDto,
} from './dto'

const STRIPE_EVENT_TYPES = {
  PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_INTENT_PAYMENT_FAILED: 'payment_intent.payment_failed',
  INVOICE_PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
}

import { CreateCustomerResponse } from './interfaces/stripe.interface'
import { CreateAccountDto } from './dto/create-account.dto'
import { ConfigService } from '@nestjs/config'

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService,
  ) { }

  @Post('webhook')
  async handleStripeWebhook(
    @Body() body: Buffer,
    @Headers('stripe-signature') signature: string,
  ): Promise<void> {
    const endpointSecret = this.configService.get('STRIPE_API_KEY')

    let event: Stripe.Event

    try {
      event = this.stripeService.constructEventFromSignature(
        body,
        signature,
        endpointSecret,
      )
    } catch (err) {
      console.error('⚠️  Webhook signature verification failed.', err.message)
      throw new BadRequestException('Invalid Stripe webhook signature.')
    }

    switch (event.type) {
      case STRIPE_EVENT_TYPES.PAYMENT_INTENT_SUCCEEDED:
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`PaymentIntent ${paymentIntent.id} was successful!`)
        break

      case STRIPE_EVENT_TYPES.PAYMENT_INTENT_PAYMENT_FAILED:
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`PaymentIntent ${failedPaymentIntent.id} failed.`)
        break

      case STRIPE_EVENT_TYPES.INVOICE_PAYMENT_SUCCEEDED:
        const invoice = event.data.object as Stripe.Invoice
        console.log(`Invoice ${invoice.id} was paid!`)
        break

      default:
        console.log(`Unhandled event type ${event.type}.`)
    }
  }

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() createCheckoutSession: CreateCheckoutSessionDto,
  ): Promise<{ url: string }> {
    return await this.stripeService.createCheckoutSession(createCheckoutSession)
  }

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

  @Post('create-account')
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<Stripe.Response<Stripe.Account>> {
    {
      return await this.stripeService.createAccount(createAccountDto)
    }
  }

  @Get()
  helloWorld(): string {
    return 'Oa'
  }
}
