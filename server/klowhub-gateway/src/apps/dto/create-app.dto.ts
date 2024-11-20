import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsArray,
  IsUUID,
  Min,
  IsEnum,
} from 'class-validator';
import { Lenguage, LenguageEnum } from 'src/common/Enum';



export class CreateAppDto {
  @IsUUID()
  public seller_id: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  @IsPositive()
  @Type(() => Number)
  public price: number;

  @IsUrl()
  public photo_url: string;
  
  @IsUrl()
  @IsOptional()
  public deploy_url: string;

  @IsUrl()
  @IsOptional()
  public dowload_url: string;

  @IsArray()
  @IsString({ each: true })
  public technologies: string[];

  @IsEnum(LenguageEnum, {
    message: `Possible values are ${LenguageEnum}`,
  })
  public lenguage: Lenguage;
}
