import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDateString,
  IsNumberString,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Roles } from '../../common/Enum/roles.enum';

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

  @IsNotEmpty()
  @IsArray()
  @IsEnum(Roles, { each: true })
  public role: Roles[];
}
