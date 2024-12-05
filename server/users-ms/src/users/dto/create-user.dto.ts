import { Roles } from '@prisma/client';
import {
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
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
  @IsOptional()
  public bio: string;

  @IsOptional()
  @IsString()
  public photo?: string;

  @IsOptional()
  public available?: boolean;

  @IsNotEmpty()
  @IsEnum(Roles)
  public role: Roles[];
}
