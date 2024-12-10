import { Injectable } from '@nestjs/common';

import Stripe from 'stripe';

import { envs } from '../config';
import { PaymentSessionDto } from './dto/payments-session.dto';
import { Request, Response } from 'express';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.stripeSecretKey);

  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currency, items, orderId } = paymentSessionDto;

    const lineItems = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_intent_data: {
        metadata: { orderId },
      },

      line_items: lineItems,
      mode: 'payment',
      success_url: envs.stripeSuccessUrl,
      cancel_url: envs.stripeCancelUrl,
    });

    return session;
  }

  async stripeWebhook(req: Request, res: Response) {
    const signature = req.headers['stripe-signature'];

    let event: Stripe.Event;

    const endpointSecret = envs.stripeEnpointSecret;

    try {
      event = this.stripe.webhooks.constructEvent(
        req['rawBody'],
        signature,
        endpointSecret,
      );
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
    }

    switch (event.type) {
      case 'charge.succeeded':
        const chargeSucceeded = event.data.object;

        console.log('call microservice');
        console.log({ orderId: chargeSucceeded.metadata.orderId });

        break;
      default:
        console.log(`Event ${event.type} not handled`);
    }

    return res.status(200).json({ signature });
  }
}

// import { Inject, Injectable } from '@nestjs/common'

// import Stripe from 'stripe'

// import {
//   CreateCheckoutSessionDto,
//   StripeItem,
// } from './dto/create-checkout-session.dto'
// import { CreateCustomerPortalUrlDto, CreateSubscriptionDto } from './dto'
// import { CreateCustomerResponse } from './interfaces/stripe.interface'
// import { CreateAccountDto } from './dto/create-account.dto'

// @Injectable()
// export class StripeService {
//   private readonly stripe: Stripe

//   constructor(
//     @Inject('STRIPE_SECRET_KEY') private readonly stripeApiKey: string,
//   ) {
//     this.stripe = new Stripe(this.stripeApiKey)
//   }

//   private mappedStripeItems(
//     items: StripeItem[],
//   ): Stripe.Checkout.SessionCreateParams.LineItem[] {
//     const mappedItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
//       items?.map(
//         ({ name, quantity, unit_amount, currency, description, images }) => ({
//           price_data: {
//             product_data: {
//               name,
//               description,
//               images,
//             },
//             currency,
//             unit_amount,
//           },
//           quantity,
//         }),
//       )

//     return mappedItems
//   }

//   async createCheckoutSession(
//     createCheckoutSession: CreateCheckoutSessionDto,
//   ): Promise<{ url: string; orderId: string }> {
//     const {
//       commission,
//       creator_account_id,
//       items: inputItems,
//       cancel_url,
//       success_url,
//     } = createCheckoutSession

//     //todo: calculate commision how a porcentage

//     const items = this.mappedStripeItems(inputItems)

//     const sessionData: Stripe.Checkout.SessionCreateParams = {
//       line_items: items,
//       mode: 'payment',
//       payment_intent_data: {
//         application_fee_amount: commission,
//       },
//       success_url,
//       cancel_url,
//     }

//     if (creator_account_id) {
//       sessionData.payment_intent_data.transfer_data = {
//         destination: creator_account_id,
//       }
//     }

//     const session = await this.stripe.checkout.sessions.create(sessionData)

//     return { url: session.url, orderId: session.id }
//   }

//   async createSubscription({
//     customer_id,
//     price_id,
//   }: CreateSubscriptionDto): Promise<Stripe.Response<Stripe.Subscription>> {
//     const subscription = await this.stripe.subscriptions.create({
//       customer: customer_id,
//       items: [{ price: price_id }],
//     })

//     return subscription
//   }

//   // todo: customers
//   async createCustomer({
//     email,
//     name,
//   }: {
//     email: string
//     name: string
//   }): Promise<CreateCustomerResponse> {
//     const customer = await this.stripe.customers.create({
//       email,
//       name,
//     })

//     return {
//       id: customer.id,
//       name: customer.name,
//       email: customer.email,
//     }
//   }

//   async getCustomerPortalUrl({
//     customer_id,
//     return_url,
//   }: CreateCustomerPortalUrlDto): Promise<{ url: string }> {
//     const session = await this.stripe.billingPortal.sessions.create({
//       customer: customer_id,
//       return_url,
//     })

//     return { url: session.url }
//   }

//   async createAccount(
//     createAccountDto: CreateAccountDto,
//   ): Promise<Stripe.Response<Stripe.Account>> {
//     const { country, email } = createAccountDto

//     const account = await this.stripe.accounts.create({
//       country,
//       email,
//       controller: {
//         fees: {
//           payer: 'application',
//         },
//         losses: {
//           payments: 'application',
//         },
//         stripe_dashboard: {
//           type: 'express',
//         },
//       },
//     })

//     return account
//   }

//   constructEventFromSignature(
//     payload: Buffer,
//     signature: string,
//     endpointSecret: string,
//   ): Stripe.Event {
//     return this.stripe.webhooks.constructEvent(
//       payload,
//       signature,
//       endpointSecret,
//     )
//   }
// }
