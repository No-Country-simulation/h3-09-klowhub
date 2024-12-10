import { IsString } from 'class-validator'

export class CreateAccountDto {
  @IsString()
  readonly country: string

  @IsString()
  readonly email: string
}
