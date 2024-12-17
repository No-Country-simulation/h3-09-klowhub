import { IsString, IsUrl } from 'class-validator'

export class GetCustomerPortalUrlDto {
  @IsString()
  readonly customer_id: string

  @IsUrl()
  readonly return_url: string
}
