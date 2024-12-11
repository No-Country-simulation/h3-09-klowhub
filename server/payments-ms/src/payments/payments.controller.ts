import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';

import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payments-session.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('create-payment-session')
  createPaymentSession(@Body() paymentSessionDto: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  success() {
    return 'success';
  }

  @Get('cancel')
  cancel() {
    return 'cancel';
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentsService.stripeWebhook(req, res);
  }
}

// import { Controller, BadRequestException, Inject } from '@nestjs/common'
// import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices'

// import Stripe from 'stripe'
// import { StripeService } from './stripe.service'
// import {
//   CreateCheckoutSessionDto,
//   CreateCustomerDto,
//   CreateCustomerPortalUrlDto,
//   CreateSubscriptionDto,
// } from './dto'
// import { CreateCustomerResponse } from './interfaces/stripe.interface'
// import { CreateAccountDto } from './dto/create-account.dto'
// import { ConfigService } from '@nestjs/config'

// import { STRIPE_EVENT_TYPES } from './const'

// @Controller()
// export class StripeController {
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly stripeService: StripeService,
//     @Inject('ORDERS_SERVICE')
//     private readonly ordersClient: ClientProxy,
//   ) { }

//   @MessagePattern('stripe.webhook')
//   async handleWebhook(
//     @Payload() { body, signature }: { body: Buffer; signature: string },
//   ) {
//     const endpointSecret = 'whsec_1HqXKt4M7vP1E0KpT7GluIJvipxm2jGK'

//     const decodedBody = Buffer.from(body)

//     let event: Stripe.Event

//     try {
//       event = this.stripeService.constructEventFromSignature(
//         decodedBody,
//         signature,
//         endpointSecret,
//       )
//     } catch (err) {
//       throw new BadRequestException('Invalid Stripe webhook signature.')
//     }

//     switch (event.type) {
//       case STRIPE_EVENT_TYPES.PAYMENT_INTENT_SUCCEEDED:
//         console.log('PAYMENT_INTENT_SUCCEEDED')
//         return this.ordersClient.send('orders.createOrder', {})

//       case STRIPE_EVENT_TYPES.PAYMENT_INTENT_PAYMENT_FAILED:
//         console.log('PAYMENT_INTENT_PAYMENT_FAILED')
//         const failedPaymentIntent = event.data.object as Stripe.PaymentIntent
//         return `PaymentIntent ${failedPaymentIntent.id} failed.`

//       case STRIPE_EVENT_TYPES.INVOICE_PAYMENT_SUCCEEDED:
//         console.log('INVOICE_PAYMENT_SUCCEEDED')
//         const invoice = event.data.object as Stripe.Invoice
//         return `Invoice ${invoice.id} was paid!`

//       default:
//         return `Unhandled event type ${event.type}.`
//     }
//   }

//   @MessagePattern('stripe.create-checkout-session')
//   async createCheckoutSession(
//     @Payload() createCheckoutSession: CreateCheckoutSessionDto,
//   ): Promise<{ url: string }> {
//     return await this.stripeService.createCheckoutSession(createCheckoutSession)
//   }

//   @MessagePattern('stripe.create-subscription')
//   async createSubscription(
//     @Payload() createSubscriptionDto: CreateSubscriptionDto,
//   ): Promise<Stripe.Response<Stripe.Subscription>> {
//     return await this.stripeService.createSubscription(createSubscriptionDto)
//   }

//   @MessagePattern('stripe.create-customer')
//   async createCustomer(
//     @Payload() createCustomerDto: CreateCustomerDto,
//   ): Promise<CreateCustomerResponse> {
//     return await this.stripeService.createCustomer(createCustomerDto)
//   }

//   @MessagePattern('stripe.customer-portal')
//   async getCustomerPortalUrl(
//     @Payload() createCustomerPortalUrlDto: CreateCustomerPortalUrlDto,
//   ): Promise<{ url: string }> {
//     return await this.stripeService.getCustomerPortalUrl(
//       createCustomerPortalUrlDto,
//     )
//   }

//   @MessagePattern('stripe.create-account')
//   async createAccount(
//     @Payload() createAccountDto: CreateAccountDto,
//   ): Promise<Stripe.Response<Stripe.Account>> {
//     return await this.stripeService.createAccount(createAccountDto)
//   }
// }