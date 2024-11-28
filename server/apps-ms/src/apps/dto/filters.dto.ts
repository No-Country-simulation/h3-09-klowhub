import { AppLenguage } from '@prisma/client';
import { IsOptional, IsEnum, IsArray, IsString } from 'class-validator';
import { AppLenguageEnum } from '../Enum/apps.enum';

export class FiltersDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filter: string[];
  
  @IsOptional()
  @IsEnum(AppLenguageEnum, {
    message: `Possible values are ${AppLenguageEnum}`,
  })
  public lenguage: AppLenguage;
}
