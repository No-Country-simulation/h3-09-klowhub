import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import Stripe from 'stripe';

import { envs } from '../config';
import { PaymentSessionDto } from './dto/payments-session.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateSubscriptionDto, GetCustomerPortalUrlDto } from './dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.stripeSecretKey);

  constructor(
    @Inject('ORDER_SERVICE')
    private readonly orderClient: ClientProxy
  ) { }

  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currency, items, orderId } = paymentSessionDto;

    const lineItems = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_intent_data: {
        metadata: {
          orderId,
          sellerDistribution: JSON.stringify(items.map(item => ({
            seller: item.sellerId,
            amount: (item.price * 100) * item.quantity
          }))),
        },
      },

      line_items: lineItems,
      mode: 'payment',
      success_url: envs.stripeSuccessUrl,
      cancel_url: envs.stripeCancelUrl,
    });

    return {
      cancelUrl: session.cancel_url,
      successUrl: session.success_url,
      url: session.url
    }
  }

  async stripeWebhook({ signature, rawBody }: { signature: string, rawBody: string }) {

    let event: Stripe.Event;

    const endpointSecret = envs.stripeEnpointSecret;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret,
      );
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: `Webhook Error: ${error.message}`
      })
    }

    switch (event.type) {
      case 'charge.succeeded':
        const chargeSucceeded = event.data.object
        // const session = event.data.object


        console.log(chargeSucceeded)

        // const paymentIntent = await this.stripe.paymentIntents.retrieve(session.payment_intent.toString());


        // const sellerDistribution = JSON.parse(paymentIntent.metadata.sellerDistribution);

        // for (const { seller, amount } of sellerDistribution) {
        //   await this.stripe.transfers.create({
        //     amount,
        //     currency: 'usd',
        //     destination: seller, // ID de la cuenta conectada del vendedor
        //     transfer_group: paymentIntent.id,
        //   });
        // }

        const payload = {
          stripeChargeId: chargeSucceeded.id,
          orderId: chargeSucceeded.metadata.orderId,
          receiptUrl: chargeSucceeded.receipt_url
        }

        return await firstValueFrom(this.orderClient.send('paid-order', payload))


      default:
        console.log(`Event ${event.type} not handled`);
    }

    return {
      message: 'success',
      signature
    }
  }

  async createCustomer({
    email,
    name,
  }: {
    email: string
    name: string
  }): Promise<{ id: string, name: string, email: string }> {
    const customer = await this.stripe.customers.create({
      email,
      name,
    })

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    }
  }

  async createSubscription({
    customer_id,
    items,
  }: CreateSubscriptionDto): Promise<Stripe.Response<Stripe.Subscription>> {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customer_id,
        items
      })

      return subscription
    } catch (error) {
      throw new RpcException({
        status: error.status,
        message: error.message
      })
    }
  }

  async getCustomerPortalUrl({
    customer_id,
    return_url,
  }: GetCustomerPortalUrlDto): Promise<{ url: string }> {
    const session = await this.stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url,
    })

    return { url: session.url }
  }
}