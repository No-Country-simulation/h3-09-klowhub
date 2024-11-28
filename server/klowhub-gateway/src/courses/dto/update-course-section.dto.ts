import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseSectionDto } from './create-course-section.dto';

export class UpdateCourseSectionDto extends PartialType(
  CreateCourseSectionDto,
) {
  id: string;
}
