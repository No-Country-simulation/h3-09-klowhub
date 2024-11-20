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
  IsNotEmpty,
} from 'class-validator';
import { Lenguage, LenguageEnum } from 'src/common/Enum';



export class CreateAppDto {
  @IsUUID()
  @IsNotEmpty()
  public seller_id: string;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  @IsPositive()
  @IsNotEmpty()
  @Type(() => Number)
  public price: number;

  @IsUrl()
  @IsOptional()
  public photo_url: string;
  
  @IsUrl()
  @IsOptional()
  public deploy_url: string;

  @IsUrl()
  @IsOptional()
  public download_url: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  public technologies: string[];

  @IsEnum(LenguageEnum, {
    message: `Possible values are ${LenguageEnum}`,
  })
  public lenguage: Lenguage;
}
//
