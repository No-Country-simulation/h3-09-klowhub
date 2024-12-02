import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { CreateSectionDto } from './create-course-section.dto';
import { Type } from 'class-transformer';

export class CreateResourceDto {
  @IsString()
  public sectionId: string;

  @IsBoolean()
  public extra: boolean;
}
