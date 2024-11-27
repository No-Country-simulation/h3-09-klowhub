import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  id: string;
}

/*
export class UpdateCourseDto {
  id?: string;
  title?: string;
  description?: string;
  sectionData?: {
    id: string;
    titleSection?: string;
    order?: number;
  };
  resourceData?: {
    id: string;
    mediaId?: string;
  };
}
*/
