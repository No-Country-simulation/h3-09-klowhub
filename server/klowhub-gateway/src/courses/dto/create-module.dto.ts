import {
  IsUUID,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateLessonDto } from './create-lesson.dto';

export class ModuleDto {
  @IsString()
  title: string;

  @IsString()
  public courseId: string;

  @IsNumber()
  public order: number;

  @IsString()
  description: string;
}
