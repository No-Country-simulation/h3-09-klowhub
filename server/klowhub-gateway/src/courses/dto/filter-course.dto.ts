import {
  IsString,
  IsOptional,
  IsArray,
  IsEnum,
  IsBoolean,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContentType, CourseType } from '../../common/Enum/enums';
import { Platform } from '../../common/Enum/enums';

export class FilterCoursesDto {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public language?: string;

  @IsOptional()
  @IsString()
  public sector?: string;

  @IsOptional()
  @IsEnum(ContentType)
  public contentType?: ContentType;

  @IsOptional()
  @IsEnum(CourseType)
  public courseType?: CourseType;

  @IsOptional()
  @IsString()
  public level?: string;

  @IsOptional()
  @IsBoolean()
  public approved?: boolean;

  @IsOptional()
  @IsBoolean()
  public available?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public toolsAndPlatforms?: string[];

  @IsOptional()
  @IsArray()
  @IsEnum(Platform, { each: true })
  public platform?: Platform[];

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10000)
  public minPrice?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10000)
  public maxPrice?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public relatedTags?: string[];
}
