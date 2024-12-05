import {
  IsString,
  IsNotEmpty,
  IsEmail
} from 'class-validator';

export class LoginDto {

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

}
