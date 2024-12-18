import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Roles } from '../../common/Enum/roles.enum';

export class UserDto {
  @IsString()
  @IsOptional()
  public name?: string;

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
  public image?: string;

  @IsOptional()
  public available?: boolean;
  
  @IsOptional()
  @IsArray()
  @IsEnum(Roles, { each: true })
  public role: Roles[];
}
