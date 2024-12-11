import { IsNotEmpty, IsString } from 'class-validator'

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  readonly customer_id: string

  @IsNotEmpty()
  @IsString()
  readonly price_id: string
}
