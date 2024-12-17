import { Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  readonly customer_id: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => StripeItem)
  readonly items: StripeItem[]
}

class StripeItem {
  @IsNotEmpty()
  @IsString()
  price: string
}