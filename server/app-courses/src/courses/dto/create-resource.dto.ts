import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { CreateLessonDto } from './create-lesson.dto';
import { Type } from 'class-transformer';

export class CreateResourceDto {
  @IsString()
  public lessonId: string;

  @IsArray()
  public pdf: string[];
}
