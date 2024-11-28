import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, PrismaClient, Course } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseSectionDto } from './dto/create-course-section.dto';
import { UpdateCourseSectionDto } from './dto/update-course-section.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class CoursesService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('Courses service');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('onModuleInit');
  }
  //Course

  async findCoursesByUserId(userId: string) {
    this.logger.log('find_courses_by_user_id');

    const courses = await this.course.findMany({
      where: { sellerId: userId },
    });

    return courses;
  }

  async findOneCourseById(id: string) {
    this.logger.log('find_one_course_by_id');
    const course = await this.course.findUnique({
      where: { id },
    });
    return course;
  }
  async getAllCourses() {
    this.logger.log('find_all_courses');
    const course = await this.course.findMany();
    return course;
  }

  async createCourse(courseData: CreateCourseDto) {
    this.logger.log('create_course');
    const createCourse = await this.course.create({ data: courseData });
    return createCourse;
  }

  async updateCourse(id: string, updateData: UpdateCourseDto): Promise<Course> {
    this.logger.log('update_course');
    const { id: _, ...Data } = updateData;
    const updateCourse = await this.course.update({
      where: { id },
      data: Data,
    });
    return updateCourse;
  }

  async deleteCourse(courseId: string): Promise<Course> {
    this.logger.log('delete_course');

    const updateCourse = await this.course.update({
      where: { id: courseId },
      data: {
        available: false,
      },
    });
    return updateCourse;
  }
  //  Course Section

  async createCourseSection(courseSectionData: CreateCourseSectionDto) {
    this.logger.log('create_course_section');
    const courseSection = await this.courseSection.create({
      data: courseSectionData,
    });
    return courseSection;
  }

  async getAllCourseSections() {
    this.logger.log('find_all_course_sections');
    const courseSections = await this.courseSection.findMany();
    return courseSections;
  }

  async findOneCourseSectionById(id: string) {
    this.logger.log('find_one_course_section_by_id');
    const courseSection = await this.courseSection.findUnique({
      where: { id },
    });
    return courseSection;
  }

  async updateCourseSection(id: string, updateData: UpdateCourseSectionDto) {
    this.logger.log('update_course_section');
    const updateCourseSection = await this.courseSection.update({
      where: { id },
      data: updateData,
    });
    return updateCourseSection;
  }

  async deleteCourseSection(id: string) {
    this.logger.log('delete_course_section');

    try {
      const deletedCourseSection = await this.courseSection.delete({
        where: { id },
      });
      return deletedCourseSection;
    } catch (error) {
      this.logger.error(`Error deleting course section with ID ${id}`, error);
      throw new Error('Could not delete course section');
    }
  }
  // Resource

  async createResource(resourceData: CreateResourceDto) {
    this.logger.log('create_resource');
    const resource = await this.resource.create({
      data: resourceData,
    });
    return resource;
  }

  async getAllResources() {
    this.logger.log('find_all_resources');
    const resources = await this.resource.findMany();
    return resources;
  }

  async findOneResourceById(id: string) {
    this.logger.log('find_one_resource_by_id');
    const resource = await this.resource.findUnique({
      where: { id },
    });
    return resource;
  }

  async updateResource(id: string, updateData: UpdateResourceDto) {
    this.logger.log('update_resource');
    const updateResource = await this.resource.update({
      where: { id },
      data: updateData,
    });
    return updateResource;
  }

  async deleteResource(id: string) {
    this.logger.log('delete_resource');

    try {
      const deletedResource = await this.resource.delete({
        where: { id },
      });
      return deletedResource;
    } catch (error) {
      this.logger.error(`Error deleting resource with ID ${id}`, error);
      throw new Error('Could not delete resource');
    }
  }
}
