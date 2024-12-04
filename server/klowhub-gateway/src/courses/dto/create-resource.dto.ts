import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { CreateLessonDto } from './create-lesson.dto';
import { Type } from 'class-transformer';

export class CreateResourceDto {
  @IsString()
  public lessonId: string;

  @IsString()
  public type: string;

  @IsString()
  public mediaId: string;
}
