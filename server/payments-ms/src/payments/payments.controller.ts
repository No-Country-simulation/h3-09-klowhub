import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payments-session.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @MessagePattern('create-payment-session')
  createPaymentSession(@Payload() paymentSessionDto: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @MessagePattern('stripe-webhook')
  stripeWebhook(@Payload() data: { signature: string, rawBody: string }) {
    return this.paymentsService.stripeWebhook(data);
  }
}