import { Body, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import Stripe from 'stripe';

import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payments-session.dto';
import { CreateCustomerDto, CreateSubscriptionDto, GetCustomerPortalUrlDto } from './dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @MessagePattern('create-payment-session')
  createPaymentSession(@Payload() paymentSessionDto: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @MessagePattern('stripe.webhook')
  stripeWebhook(@Payload() data: { signature: string, rawBody: string }) {
    return this.paymentsService.stripeWebhook(data);
  }

  @MessagePattern('stripe.create-customer')
  async createCustomer(
    @Payload() createCustomerDto: CreateCustomerDto,
  ) {
    return this.paymentsService.createCustomer(createCustomerDto)
  }

  @MessagePattern('stripe.create-subscription')
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    return await this.paymentsService.createSubscription(createSubscriptionDto)
  }

  @MessagePattern('stripe.get-customer-portal-url')
  async getCustomerPortalUrl(
    @Body() getCustomerPortalUrl: GetCustomerPortalUrlDto,
  ) {
    return await this.paymentsService.getCustomerPortalUrl(getCustomerPortalUrl)
  }
}