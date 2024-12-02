import { Controller, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import {
  Course as CourseModel,
  Section as CourseSectionModel,
  Resource as ResourceModel,
  Module as ModuleModel,
} from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateSectionDto } from './dto/create-course-section.dto';
import { UpdateCourseSectionDto } from './dto/update-course-section.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { RpcException } from '@nestjs/microservices';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern({ cmd: 'find_courses_by_user_id' })
  async findCoursesByUserId(@Payload('userId') userId: string) {
    return this.coursesService.findCoursesByUserId(userId);
  }

  @MessagePattern({ cmd: 'create_course' })
  async signupCourse(@Payload() courseData: CourseDto) {
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
  ////CourseSection

  @MessagePattern({ cmd: 'create_course_section' })
  async createCourseSection(
    @Payload() courseSectionData: CreateSectionDto,
  ): Promise<CourseSectionModel> {
    return this.coursesService.createCourseSection(courseSectionData);
  }

  @MessagePattern({ cmd: 'find_all_course_sections' })
  async getAllCourseSections() {
    return this.coursesService.getAllCourseSections();
  }

  @MessagePattern({ cmd: 'find_one_course_section_by_id' })
  async getCourseSectionById(@Payload('id') id: string) {
    return this.coursesService.findOneCourseSectionById(id);
  }

  @MessagePattern({ cmd: 'update_course_section' })
  async updateCourseSection(
    @Payload() updateData: UpdateCourseSectionDto,
  ): Promise<CourseSectionModel> {
    return this.coursesService.updateCourseSection(updateData.id, updateData);
  }

  @MessagePattern({ cmd: 'delete_course_section' })
  async deleteCourseSection(@Payload('id') id: string) {
    if (!id) {
      throw new RpcException('id is required');
    }
    return this.coursesService.deleteCourseSection(id);
  }
  ////Resource

  @MessagePattern({ cmd: 'create_resource' })
  async createResource(@Payload() resourceData: CreateResourceDto) {
    return this.coursesService.createResource(resourceData);
  }

  @MessagePattern({ cmd: 'find_all_resources' })
  async getAllResources() {
    return this.coursesService.getAllResources();
  }

  @MessagePattern({ cmd: 'find_one_resource_by_id' })
  async getResourceById(@Payload('id') id: string) {
    return this.coursesService.findOneResourceById(id);
  }

  @MessagePattern({ cmd: 'update_resource' })
  async updateResource(
    @Payload() updateData: UpdateResourceDto,
  ): Promise<ResourceModel> {
    return this.coursesService.updateResource(updateData.id, updateData);
  }

  @MessagePattern({ cmd: 'delete_resource' })
  async deleteResource(@Payload('id') id: string) {
    if (!id) {
      throw new RpcException('id is required');
    }
    return this.coursesService.deleteResource(id);
  }
  // Module

  @MessagePattern({ cmd: 'create_module' })
  async signupModule(@Payload() moduleData: ModuleDto) {
    return this.coursesService.createModule(moduleData);
  }

  @MessagePattern({ cmd: 'find_all_modules' })
  async getAllModules() {
    return this.coursesService.getAllModules();
  }

  @MessagePattern({ cmd: 'find_one_module_by_id' })
  async getModuleById(@Payload('id') id: string) {
    return this.coursesService.findOneModuleById(id);
  }

  @MessagePattern({ cmd: 'update_module' })
  async updateModule(
    @Payload() updateData: UpdateModuleDto,
  ): Promise<ModuleModel> {
    return this.coursesService.updateModule(updateData.id, updateData);
  }

  @MessagePattern({ cmd: 'delete_module' })
  async deleteModule(@Payload('id') id: string) {
    if (!id) {
      throw new RpcException('id is required');
    }
    return this.coursesService.deleteModule(id);
  }
}
