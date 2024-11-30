import { Controller, BadRequestException } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import Stripe from 'stripe'
import { StripeService } from './stripe.service'
import {
  CreateCheckoutSessionDto,
  CreateCustomerDto,
  CreateCustomerPortalUrlDto,
  CreateSubscriptionDto,
} from './dto'
import { CreateCustomerResponse } from './interfaces/stripe.interface'
import { CreateAccountDto } from './dto/create-account.dto'
import { ConfigService } from '@nestjs/config'

const STRIPE_EVENT_TYPES = {
  PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_INTENT_PAYMENT_FAILED: 'payment_intent.payment_failed',
  INVOICE_PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
}

@Controller()
export class StripeController {
  constructor(
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService,
  ) { }

  @MessagePattern('stripe.webhook')
  async handleStripeWebhook(
    @Payload() { body, signature }: { body: Buffer; signature: string },
  ): Promise<void> {
    // const endpointSecret = this.configService.get('STRIPE_API_KEY')
    const endpointSecret = 'whsec_1HqXKt4M7vP1E0KpT7GluIJvipxm2jGK'

    const decodedBody = Buffer.from(body)

    let event: Stripe.Event

    try {
      event = this.stripeService.constructEventFromSignature(
        decodedBody,
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

  @MessagePattern('stripe.create-checkout-session')
  async createCheckoutSession(
    @Payload() createCheckoutSession: CreateCheckoutSessionDto,
  ): Promise<{ url: string }> {
    return await this.stripeService.createCheckoutSession(createCheckoutSession)
  }

  @MessagePattern('stripe.create-subscription')
  async createSubscription(
    @Payload() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    return await this.stripeService.createSubscription(createSubscriptionDto)
  }

  @MessagePattern('stripe.create-customer')
  async createCustomer(
    @Payload() createCustomerDto: CreateCustomerDto,
  ): Promise<CreateCustomerResponse> {
    return await this.stripeService.createCustomer(createCustomerDto)
  }

  @MessagePattern('stripe.customer-portal')
  async getCustomerPortalUrl(
    @Payload() createCustomerPortalUrlDto: CreateCustomerPortalUrlDto,
  ): Promise<{ url: string }> {
    return await this.stripeService.getCustomerPortalUrl(
      createCustomerPortalUrlDto,
    )
  }

  @MessagePattern('stripe.create-account')
  async createAccount(
    @Payload() createAccountDto: CreateAccountDto,
  ): Promise<Stripe.Response<Stripe.Account>> {
    return await this.stripeService.createAccount(createAccountDto)
  }
}
