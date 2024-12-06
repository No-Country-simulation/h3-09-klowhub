import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator'

export class CreateCheckoutSessionDto {
  @IsOptional()
  @IsString()
  readonly creator_account_id?: string

  @IsArray()
  @ArrayMinSize(1, { message: 'The items value must have at least one item' })
  @ValidateNested({ each: true })
  @Type(() => StripeItem)
  readonly items: StripeItem[]

  @IsOptional()
  @IsNumber()
  readonly commission?: number

  @IsUrl()
  readonly success_url: string

  @IsUrl()
  readonly cancel_url: string
}

export class StripeItem {
  @IsString()
  readonly currency: string

  @IsString()
  readonly name: string

  @IsOptional()
  @IsString()
  readonly description?: string

  @IsNumber()
  readonly unit_amount: number

  @IsNumber()
  readonly quantity: number

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  readonly images?: string[]
}
