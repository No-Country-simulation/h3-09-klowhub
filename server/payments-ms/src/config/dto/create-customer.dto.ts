import { IsString } from 'class-validator'

export class CreateCustomerDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly email: string
}
