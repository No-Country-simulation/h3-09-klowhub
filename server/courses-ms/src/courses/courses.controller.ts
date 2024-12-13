import {
  Controller,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import {
  Course as CourseModel,
  Lesson as CourseLessonModel,
  Resource as ResourceModel,
  Module as ModuleModel,
} from '@prisma/client';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilterCoursesDto } from './dto/filter-course.dto';
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Course
  @MessagePattern('find_courses_by_user_id')
  async findCoursesByUserId(@Payload('creator') creator: string) {
    return this.coursesService.findCoursesByUserId(creator);
  }

  @MessagePattern('create_course')
  async signupCourse(@Payload() courseData: CourseDto) {
    return this.coursesService.createCourse(courseData);
  }

  @MessagePattern('find_all_courses')
  async findAll(@Payload() data: { filters: FilterCoursesDto }) {
    const { filters } = data; // Extraer los filtros del objeto recibido
    return this.coursesService.getAllCourses(filters); // Llamamos al servicio con los filtros
  }

  @MessagePattern('find_one_course_by_id')
  async getCourseById(@Payload('id') id: string) {
    return this.coursesService.findOneCourseById(id);
  }

  @MessagePattern('update_course')
  async updateCourse(
    @Payload() updateData: UpdateCourseDto,
  ): Promise<CourseModel> {
    return this.coursesService.updateCourse(updateData.id, updateData);
  }

  @MessagePattern('delete_course')
  async deleteCourse(@Payload('id') id: string): Promise<CourseModel> {
    if (!id) {
      throw new RpcException('id is required');
    }
    console.log(id);
    return this.coursesService.deleteCourse(id);
  }
  //  Image
  @MessagePattern('upload_image')
  async uploadImage(
    @Payload()
    file: {
      buffer: { type: string; data: number[] };
      originalname: string;
      mimetype: string;
    },
  ) {
    const fileBuffer: Buffer = Buffer.from(file.buffer.data);
    return this.coursesService.uploadImage({
      buffer: fileBuffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
  }

  // Lesson

  @MessagePattern('upload_lesson_video')
  async uploadLessonVideo(
    @Payload()
    file: {
      buffer: { type: string; data: number[] };
      originalname: string;
      mimetype: string;
    },
  ) {
    const fileBuffer: Buffer = Buffer.from(file.buffer.data);
    return this.coursesService.uploadVideo({
      buffer: fileBuffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @MessagePattern('create_lesson')
  async signupLesson(@Payload() lessonData: CreateLessonDto) {
    return this.coursesService.createLesson(lessonData);
  }

  @MessagePattern('find_all_course_lessons')
  async getAllCourseLessons() {
    return this.coursesService.getAllCourseLessons();
  }

  @MessagePattern('find_one_course_lesson_by_id')
  async getCourseLessonById(@Payload('id') id: string) {
    return this.coursesService.findOneCourseLessonById(id);
  }

  @MessagePattern('update_course_lesson')
  async updateCourseLesson(
    @Payload() updateData: UpdateLessonDto,
  ): Promise<CourseLessonModel> {
    return this.coursesService.updateCourseLesson(updateData.id, updateData);
  }

  @MessagePattern('delete_course_lesson')
  async deleteCourseLesson(@Payload('id') id: string) {
    if (!id) {
      throw new RpcException('id is required');
    }
    return this.coursesService.deleteCourseLesson(id);
  }

  //// Resource

  @MessagePattern('create_resource')
  async createResource(@Payload() resourceData: CreateResourceDto) {
    return this.coursesService.createResource(resourceData);
  }

  @MessagePattern('find_all_resources')
  async getAllResources() {
    return this.coursesService.getAllResources();
  }

  @MessagePattern('find_one_resource_by_id')
  async getResourceById(@Payload('id') id: string) {
    return this.coursesService.findOneResourceById(id);
  }

  @MessagePattern('update_resource')
  async updateResource(
    @Payload() updateData: UpdateResourceDto,
  ): Promise<ResourceModel> {
    return this.coursesService.updateResource(updateData.id, updateData);
  }

  @MessagePattern('delete_resource')
  async deleteResource(@Payload('id') id: string) {
    if (!id) {
      throw new RpcException('id is required');
    }
    return this.coursesService.deleteResource(id);
  }

  // Module

  @MessagePattern('create_module')
  async signupModule(@Payload() moduleData: ModuleDto) {
    return this.coursesService.createModule(moduleData);
  }

  @MessagePattern('find_all_modules')
  async getAllModules() {
    return this.coursesService.getAllModules();
  }

  @MessagePattern('find_one_module_by_id')
  async getModuleById(@Payload('id') id: string) {
    return this.coursesService.findOneModuleById(id);
  }

  @MessagePattern('update_module')
  async updateModule(
    @Payload() updateData: UpdateModuleDto,
  ): Promise<ModuleModel> {
    return this.coursesService.updateModule(updateData.id, updateData);
  }

  @MessagePattern('delete_module')
  async deleteModule(@Payload('id') id: string) {
    if (!id) {
      throw new RpcException('id is required');
    }
    return this.coursesService.deleteModule(id);
  }
}
