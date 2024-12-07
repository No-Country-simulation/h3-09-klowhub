import { IsOptional, IsEnum, IsArray, IsString } from 'class-validator';
import {  ContentType, ContentTypeEnum, Plataform, PlataformEnum } from '../Enum/apps.enum';

export class FiltersDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public functionalities: string[];

  @IsOptional()
  @IsString()
  public language: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public sector: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public toolsAndPlatforms: string[];

  @IsOptional()
  @IsEnum(ContentTypeEnum, {
    message: `Possible values are ${ContentTypeEnum}`,
  })
  public contentType: ContentType;

  @IsOptional()
  @IsEnum(PlataformEnum, {
    message: `Possible values are ${PlataformEnum}`,
  })
  public plataform: Plataform;

  @IsOptional()
  @IsString()
  public level: string;

  @IsOptional()
  @IsString()
  public orderPrice: string;
}
