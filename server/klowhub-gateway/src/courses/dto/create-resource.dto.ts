import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { CreateLessonDto } from './create-lesson.dto';
import { Type } from 'class-transformer';
import { ResourceType } from 'src/common/Enum/enums';

export class CreateResourceDto {
  @IsString()
  public lessonId: string;

  @IsArray()
  public pdf: string[];
}
