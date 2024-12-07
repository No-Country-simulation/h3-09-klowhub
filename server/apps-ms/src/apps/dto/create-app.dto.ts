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
import { ContentTypeEnum, PlataformEnum } from '../Enum/apps.enum';
import { ContentType, Plataform } from '@prisma/client';

export class CreateAppDto {
  @IsUUID()
  @IsNotEmpty()
  public creator_id: string;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsArray()
  @IsArray()
  @IsString({ each: true })
  public functionalities: string[];

  @IsString()
  @IsNotEmpty()
  public language: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  public sector: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  public toolsAndPlatforms: string[];

  @IsNotEmpty()
  @IsEnum(ContentTypeEnum, {
    message: `Possible values are ${ContentTypeEnum}`,
  })
  public contentType: ContentType;

  @IsNotEmpty()
  @IsEnum(PlataformEnum, {
    message: `Possible values are ${PlataformEnum}`,
  })
  public plataform: Plataform;

  @IsNotEmpty()
  @IsString()
  public level: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(0)
  @IsPositive()
  @IsNotEmpty()
  @Type(() => Number)
  public price: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public photo_url: string[];
  
  @IsUrl()
  @IsOptional()
  public deploy_desktop_url: string;

  @IsUrl()
  @IsOptional()
  public dowload_desktop_url: string;
  
  @IsUrl()
  @IsOptional()
  public deploy_movil_url: string;

  @IsUrl()
  @IsOptional()
  public dowload_movil_url: string;

}
