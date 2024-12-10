import { IsString, IsUrl } from 'class-validator'

export class CreateCustomerPortalUrlDto {
  @IsString()
  readonly customer_id: string

  @IsUrl()
  readonly return_url: string
}
