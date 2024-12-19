import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import Stripe from 'stripe';
import { firstValueFrom } from 'rxjs';


import { PaymentSessionDto } from './dto/payments-session.dto';
import { envs } from '../config';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.stripeSecretKey);

  constructor(
    @Inject('ORDER_SERVICE')
    private readonly orderClient: ClientProxy
  ) { }

  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currency, items, orderId, discounts } = paymentSessionDto;

    try {
      const lineItems = items.map((item) => ({
        price_data: {
          currency,
          product_data: {
            name: item.name,
            images: [item.imageUrl]
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));

      const session = await this.stripe.checkout.sessions.create({
        payment_intent_data: {
          metadata: { orderId },
        },
        discounts,
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

    } catch (error) {
      throw new RpcException({
        status: error.status,
        message: error.message
      });
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
        const chargeSucceeded = event.data.object;

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
}