import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public role: string;

  @IsString()
  @IsNotEmpty()
  public bio: string;

  @IsNotEmpty()
  public available: boolean;

  @IsOptional()
  @IsString()
  public photo?: string;
}
