import { IsString } from 'class-validator'

export class UpdatePaymentMethodDto {
  @IsString()
  readonly paymentMethodId: string

  @IsString()
  readonly customerId: string
}
