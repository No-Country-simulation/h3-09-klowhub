import { ContentType, CourseType } from '../../common/Enum/enums';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  IsBoolean,
  IsInt,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ModuleDto } from './create-module.dto';
import { Platform } from '../../common/Enum/enums';

export class CourseDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  public photo: string;

  @IsString()
  @IsNotEmpty()
  public shortDescription: string;

  @IsNotEmpty()
  public price: number;

  @IsArray()
  public functionalities: string[];

  @IsString()
  @IsNotEmpty()
  public language: string;

  @IsString()
  @IsNotEmpty()
  public sector: string;

  @IsArray()
  public toolsAndPlatforms: string[];

  @IsNotEmpty()
  @IsEnum(ContentType)
  public contentType: ContentType;

  @IsNotEmpty()
  @IsEnum(CourseType)
  public courseType: CourseType;

  @IsNotEmpty()
  @IsString()
  public level: string;

  @IsNotEmpty()
  @IsString()
  public contentPillar: string;

  @IsNotEmpty()
  @IsArray()
  public learningOutcomes: string[];

  @IsArray()
  public prerequisites: string[];

  @IsNotEmpty()
  @IsString()
  public detailedDescription: string;

  @IsUUID()
  @IsNotEmpty()
  public creator_id: string;

  @IsArray()
  @IsNotEmpty()
  public platform: Platform[];

  @IsArray()
  @IsNotEmpty()
  public relatedTags: string[];
}
