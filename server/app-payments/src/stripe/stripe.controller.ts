import { Controller, BadRequestException, Inject } from '@nestjs/common'
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices'

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
    @Inject('ORDERS_SERVICE')
    private readonly ordersClient: ClientProxy,
  ) { }

  @MessagePattern('stripe.webhook')
  async handleWebhook(
    @Payload() { body, signature }: { body: Buffer; signature: string },
  ) {
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
      throw new BadRequestException('Invalid Stripe webhook signature.')
    }

    // Check event type
    switch (event.type) {
      case STRIPE_EVENT_TYPES.PAYMENT_INTENT_SUCCEEDED:
        console.log('PAYMENT_INTENT_SUCCEEDED')
        // const paymentIntent = event.data.object as Stripe.PaymentIntent

        return this.ordersClient.send('orders.createOrder', {})

      // return `PaymentIntent ${paymentIntent.id} was successful!`

      case STRIPE_EVENT_TYPES.PAYMENT_INTENT_PAYMENT_FAILED:
        console.log('PAYMENT_INTENT_PAYMENT_FAILED')
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent
        return `PaymentIntent ${failedPaymentIntent.id} failed.`

      case STRIPE_EVENT_TYPES.INVOICE_PAYMENT_SUCCEEDED:
        console.log('INVOICE_PAYMENT_SUCCEEDED')
        const invoice = event.data.object as Stripe.Invoice
        return `Invoice ${invoice.id} was paid!`

      default:
        return `Unhandled event type ${event.type}.`
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
