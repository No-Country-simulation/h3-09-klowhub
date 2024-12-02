import { PartialType } from '@nestjs/mapped-types';
import { CreateSectionDto } from './create-course-section.dto';

export class UpdateCourseSectionDto extends PartialType(CreateSectionDto) {
  id: string;
}
