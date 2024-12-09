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
import { ContentType, CourseType } from '../../common/enums';
import { ModuleDto } from './create-module.dto';

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

  @IsNotEmpty()
  @IsBoolean()
  public approved: boolean;

  @IsNotEmpty()
  @IsBoolean()
  public available: boolean;

  @IsNotEmpty()
  @IsString()
  public creator: string;
}
