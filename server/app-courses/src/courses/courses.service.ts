import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, PrismaClient, Course } from '@prisma/client';
import { CreateCourseDto } from './dto/create-course.dto';
import { RpcException } from '@nestjs/microservices';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseSectionDto } from './dto/create-course-section.dto';

@Injectable()
export class CoursesService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('Courses service');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('onModuleInit');
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

  async createSection(courseSectionData: CreateCourseSectionDto) {
    this.logger.log('create_section');
    const createSection = await this.courseSection.create({
      data: courseSectionData,
    });
    return createSection;
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
}
