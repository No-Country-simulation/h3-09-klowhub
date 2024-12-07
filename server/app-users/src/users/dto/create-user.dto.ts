import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Roles } from '@prisma/client';

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
  public bio: string;

  @IsOptional()
  @IsString()
  public photo?: string;

  @IsOptional()
  public available?: boolean;

  @IsOptional()
  @IsEnum(Roles)
  public role: Roles[];
}
