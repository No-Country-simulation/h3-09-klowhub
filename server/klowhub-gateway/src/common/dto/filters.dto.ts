import { IsOptional, IsEnum, IsArray, IsString } from 'class-validator';
import {  Lenguage, LenguageEnum } from '../Enum/apps.enum';

export class FiltersDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filter: string[];
  
  @IsOptional()
  @IsEnum(LenguageEnum, {
    message: `Possible values are ${LenguageEnum}`,
  })
  public lenguage: Lenguage;
}
