import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentClient: ClientProxy
  ) { }

  // @Post('webhook')
  // async stripeWebhook(@Req() req: Request, @Res() res: Response) {
  //   return this.paymentClient.send('stripeWebhook', {})
  // }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    const signature = req.headers['stripe-signature'];
    const rawBody = req['rawBody'].toString()

    const result = await firstValueFrom (this.paymentClient.send('stripe-webhook', {
      rawBody,
      signature,
    }))
  }
}
