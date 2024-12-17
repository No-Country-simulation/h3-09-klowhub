import { Body, Controller, HttpException, Inject, Post, Req, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { CreateCustomerDto, CreateSubscriptionDto, GetCustomerPortalUrlDto } from './dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentClient: ClientProxy
  ) { }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    const signature = req.headers['stripe-signature'];
    const rawBody = req['rawBody'].toString()

    const result = await firstValueFrom(this.paymentClient.send('stripe.webhook', {
      rawBody,
      signature,
    }))
  }

  @Post('stripe-create-customer')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto
  ) {
    return await firstValueFrom(
      this.paymentClient.send('stripe.create-customer', createCustomerDto)
    )
  }

  @Post('stripe-create-subscription')
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    try {
      return await firstValueFrom(
        this.paymentClient.send('stripe.create-subscription', createSubscriptionDto)
      )
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
  
  @Post('stripe-customer-portal')
  async getCustomerPortalUrl(
    @Body() getCustomerPortalUrl: GetCustomerPortalUrlDto,
  ) {
    return await firstValueFrom(
      this.paymentClient.send('stripe.get-customer-portal-url', getCustomerPortalUrl)
    )
  }
}
