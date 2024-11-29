import { Controller, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course as CourseModel } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { RpcException } from '@nestjs/microservices';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern({ cmd: 'create_course' })
  async signupCourse(@Payload() courseData: CreateCourseDto) {
    return this.coursesService.createCourse(courseData);
  }

  @MessagePattern({ cmd: 'find_all_courses' })
  async getAllCourses() {
    return this.coursesService.getAllCourses();
  }

  @MessagePattern({ cmd: 'find_one_course_by_id' })
  async getCourseById(@Payload('id') id: string) {
    return this.coursesService.findOneCourseById(id);
  }

  @MessagePattern({ cmd: 'update_course' })
  async updateCourse(
    @Payload() updateData: UpdateCourseDto,
  ): Promise<CourseModel> {
    return this.coursesService.updateCourse(updateData.id, updateData);
  }

  @MessagePattern({ cmd: 'delete_course' })
  async deleteCourse(@Payload('id') id: string): Promise<CourseModel> {
    if (!id) {
      throw new RpcException('id is required');
    }
    console.log(id);
    return this.coursesService.deleteCourse(id);
  }
}
