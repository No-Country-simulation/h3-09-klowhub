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
import { CreateResourceDto } from './dto/create-resource.dto';

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

  /*
  async createCourse(courseData: CreateCourseDto) {
    this.logger.log('create_course');

    try {
      // Create the course
      const createdCourse = await this.course.create({ data: courseData });
      this.logger.log(`Course created with ID: ${createdCourse.id}`);

      // Create the section associated with the course
      const sectionData: CreateCourseSectionDto = {
        titleSection: 'Default Section Title',
        courseId: createdCourse.id,
        order: 1,
      };
      const createdSection = await this.courseSection.create({
        data: sectionData,
      });
      this.logger.log(
        `Section created with ID: ${createdSection.id} for course ID: ${createdCourse.id}`,
      );

      // Create the resource associated with the section
      const resourceData: CreateResourceDto = {
        sectionId: createdSection.id,
        mediaId: 'default-media-id', // id default
      };
      const createdResource = await this.resource.create({
        data: resourceData,
      });
      this.logger.log(
        `Resource created with ID: ${createdResource.id} for section ID: ${createdSection.id}`,
      );

      return {
        course: createdCourse,
        section: createdSection,
        resource: createdResource,
      };
    } catch (error) {
      this.logger.error('Error creating course, section, or resource', error);
      throw new RpcException('Failed to create course and related entities');
    }
  }
*/
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

  /*
  async updateCourse(id: string, updateData: UpdateCourseDto): Promise<any> {
    this.logger.log(`update_course with ID: ${id}`);

    try {
      // Update the course
      const { sectionData, resourceData, ...courseData } = updateData;
      const updatedCourse = await this.course.update({
        where: { id },
        data: courseData,
      });
      this.logger.log(`Course with ID: ${id} updated successfully`);

      // Update the associated section
      let updatedSection = null;
      if (sectionData) {
        updatedSection = await this.courseSection.update({
          where: { id: sectionData.id },
          data: sectionData,
        });
        this.logger.log(
          `Section with ID: ${sectionData.id} updated successfully for course ID: ${id}`,
        );
      }

      // Update the associated resource
      let updatedResource = null;
      if (resourceData) {
        updatedResource = await this.resource.update({
          where: { id: resourceData.id },
          data: resourceData,
        });
        this.logger.log(
          `Resource with ID: ${resourceData.id} updated successfully for section ID: ${sectionData?.id}`,
        );
      }

      // Return updated data
      return {
        course: updatedCourse,
        section: updatedSection,
        resource: updatedResource,
      };
    } catch (error) {
      this.logger.error(`Error updating course with ID: ${id}`, error);
      throw new RpcException('Failed to update course and related entities');
    }
  }
*/
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
