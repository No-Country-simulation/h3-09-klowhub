import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, PrismaClient, Course } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { CourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { storage } from '../config/storage.config';

@Injectable()
export class CoursesService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('Courses service');
  private bucketName = process.env.BUCKET_NAME;
  private bucketNameImage = process.env.BUCKET_NAME_IMAGE;

  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('onModuleInit');
  }
  //Course

  async findCoursesByUserId(userId: string) {
    this.logger.log('find_courses_by_user_id');

    const courses = await this.course.findMany({
      where: { creator: userId },
    });

    return courses;
  }

  async findOneCourseById(id: string) {
    this.logger.log('find_one_course_by_id');

    try {
      const course = await this.course.findUnique({
        where: { id },
        include: {
          module: {
            include: {
              lesson: {
                include: {
                  resource: true,
                },
              },
            },
          },
        },
      });

      if (!course) {
        throw new BadRequestException(`Course with ID ${id} not found`);
      }

      return course;
    } catch (error) {
      this.logger.error(
        `Error fetching course with ID ${id}: ${error.message}`,
      );
      throw new RpcException(error.message);
    }
  }

  async getAllCourses() {
    this.logger.log('find_all_courses');
    const course = await this.course.findMany();
    return course;
  }

  async createCourse(courseData: CourseDto) {
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

  //  Image
  async uploadImage(file: {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  }): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided for upload');
    }
    this.logger.log('Uploading image to Google Cloud Storage');
    const bucket = storage.bucket(this.bucketNameImage);
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });
    return new Promise((resolve, reject) => {
      blobStream
        .on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${this.bucketNameImage}/${blob.name}`;
          this.logger.log(`Image uploaded successfully: ${publicUrl}`);
          console.log(publicUrl);
          resolve(publicUrl);
        })
        .on('error', (err) => {
          this.logger.error('Error uploading image:', err.message);
          reject(err);
        })
        .end(file.buffer);
    });
  }

  async uploadVideo(file: {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
  }): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided for upload');
    }

    this.logger.log('Uploading video to Google Cloud Storage');
    const bucket = storage.bucket(this.bucketName);
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
    });

    return new Promise((resolve, reject) => {
      blobStream
        .on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${blob.name}`;
          this.logger.log(`Video uploaded successfully: ${publicUrl}`);
          resolve(publicUrl);
        })
        .on('error', (err) => {
          this.logger.error('Error uploading video:', err.message);
          reject(err);
        })
        .end(file.buffer);
    });
  }
  //  Lesson
  async createLesson(lessonData: CreateLessonDto) {
    this.logger.log('create_course_lesson');
    try {
      const courseLesson = await this.lesson.create({
        data: lessonData,
      });
      return courseLesson;
    } catch (error) {
      this.logger.error(`Error creating course section`, error);
      throw new Error('Could not create course section');
    }
  }

  async getAllCourseLessons() {
    this.logger.log('find_all_course_lessons');
    const courseLessons = await this.lesson.findMany();
    return courseLessons;
  }

  async findOneCourseLessonById(id: string) {
    this.logger.log('find_one_course_lesson_by_id');
    const courseLesson = await this.lesson.findUnique({
      where: { id },
    });
    return courseLesson;
  }

  async updateCourseLesson(id: string, updateData: UpdateLessonDto) {
    this.logger.log('update_course_lesson');
    const updateCourseLesson = await this.lesson.update({
      where: { id },
      data: updateData,
    });
    return updateCourseLesson;
  }

  async deleteCourseLesson(id: string) {
    this.logger.log('delete_course_lesson');

    try {
      const deletedCourseLesson = await this.lesson.delete({
        where: { id },
      });
      return deletedCourseLesson;
    } catch (error) {
      this.logger.error(`Error deleting course lesson with ID ${id}`, error);
      throw new Error('Could not delete course lesson');
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

  //Module

  async createModule(moduleData: ModuleDto) {
    this.logger.log('create_module');
    const module = await this.module.create({
      data: moduleData,
    });
    return module;
  }

  async getAllModules() {
    this.logger.log('find_all_modules');
    const modules = await this.module.findMany();
    return modules;
  }

  async findOneModuleById(id: string) {
    this.logger.log('find_one_module_by_id');
    const module = await this.module.findUnique({
      where: { id },
    });
    return module;
  }

  async updateModule(id: string, updateData: UpdateModuleDto) {
    this.logger.log('update_module');
    const updateModule = await this.module.update({
      where: { id },
      data: updateData,
    });
    return updateModule;
  }

  async deleteModule(id: string) {
    this.logger.log('delete_module');

    try {
      const deletedModule = await this.module.delete({
        where: { id },
      });
      return deletedModule;
    } catch (error) {
      this.logger.error(`Error deleting module with ID ${id}`, error);
      throw new Error('Could not delete module');
    }
  }
}
