import { ContentType, CourseType } from '../../common/Enum/enums';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ModuleDto } from './create-module.dto';

export class CourseDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsArray()
  public photo: string[];

  @IsString()
  public shortDescription: string;

  @IsOptional()
  @IsInt()
  public price?: number;

  @IsArray()
  public functionalities: string[];

  @IsString()
  public language: string;

  @IsString()
  public sector: string;

  @IsArray()
  public toolsAndPlatforms: string[];

  @IsEnum(ContentType)
  public contentType: ContentType;

  @IsEnum(CourseType)
  public courseType: CourseType;

  @IsString()
  public level: string;

  @IsString()
  public contentPillar: string;

  @IsArray()
  public learningOutcomes: string[];

  @IsArray()
  public prerequisites: string[];

  @IsString()
  public detailedDescription: string;

  @IsBoolean()
  public approved: boolean;

  @IsBoolean()
  public available: boolean;

  @IsString()
  public creator: string;

  @IsOptional()
  @IsString()
  moduleId?: string;
}
