import { PartialType } from '@nestjs/mapped-types';
import { CourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CourseDto) {
  id: string;
}
