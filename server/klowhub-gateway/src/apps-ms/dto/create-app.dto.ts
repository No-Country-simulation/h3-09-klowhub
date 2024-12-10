import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Min,
} from 'class-validator';
import { ContentType, Platform } from 'src/common/Enum/enums';

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
  @IsEnum(ContentType, {
    message: `Possible values are ${ContentType}`,
  })
  public contentType: ContentType;

  @IsNotEmpty()
  @IsEnum(Platform, {
    message: `Possible values are ${Platform}`,
  })
  public plataform: Platform;

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

//
