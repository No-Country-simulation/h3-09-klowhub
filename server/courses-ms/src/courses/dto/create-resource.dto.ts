import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateCourseSectionDto } from './create-course-section.dto';

export class CreateResourceDto {
  @IsNotEmpty()
  public sectionId: string;
  @IsNotEmpty()
  @IsString()
  public mediaId: string;
}
