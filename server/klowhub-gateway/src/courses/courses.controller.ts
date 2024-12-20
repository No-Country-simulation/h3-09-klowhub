import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { CourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilterCoursesDto } from './dto/filter-course.dto';
@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('COURSES_SERVICE') private readonly courseClient: ClientProxy,
  ) {}
  // Courses

  @Get('findCoursesByUserId/:creator_id')
  async findCoursesByUserId(
    @Param('creator_id', ParseUUIDPipe) creator_id: string,
  ) {
    try {
      const product = await firstValueFrom(
        this.courseClient.send('find_courses_by_user_id', { creator_id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('create')
  createCourse(@Body() createCourseDto: CourseDto) {
    return this.courseClient.send('create_course', createCourseDto);
  }
  @Post('findAll')
  findAllCourses(
    @Body() body: { pagination: PaginationDto; filters: FilterCoursesDto },
  ) {
    const { pagination, filters } = body;
    // Aquí pasamos tanto los filtros como la paginación al microservicio
    return this.courseClient.send('find_all_courses', { pagination, filters });
  }

  @Get('course/:id')
  async findOneCourse(@Param('id') id: string) {
    try {
      const course = await firstValueFrom(
        this.courseClient.send('find_one_course_by_id', { id }),
      );
      return course;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch('patch/:id')
  async updateCourse(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    try {
      const course = await firstValueFrom(
        this.courseClient.send('update_course', { id, ...updateCourseDto }),
      );
      return course;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('delete/:id')
  removeCourse(@Param('id', ParseUUIDPipe) id: string) {
    if (!id) {
      throw new RpcException('id is required');
    }

    console.log('Deleting course with ID:', id);

    return this.courseClient.send('delete_course', { id }).pipe(
      catchError((err) => {
        console.error('Error from microservice:', err);
        const errorMessage =
          typeof err === 'object' && err.message
            ? err.message
            : 'Unexpected error occurred';
        throw new RpcException({
          status: 400,
          message: errorMessage,
        });
      }),
    );
  }
  // Course Lesson

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const fileData = {
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    };
    return this.courseClient.send('upload_image', fileData);
  }

  @Post('uploadLessonVideo')
  @UseInterceptors(FileInterceptor('file'))
  uploadLessonVideo(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const fileData = {
      buffer: file.buffer,
      originalname: file.originalname,
      mimetype: file.mimetype,
    };
    return this.courseClient.send('upload_lesson_video', fileData);
  }

  @Post('createLesson')
  createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.courseClient.send('create_lesson', createLessonDto);
  }

  @Get('findAllLessons')
  findAllCourseLessons(@Query() paginationDto: PaginationDto) {
    return this.courseClient.send('find_all_course_lessons', paginationDto);
  }

  @Get('courseLesson/:id')
  async findOneCourseLesson(@Param('id') id: string) {
    try {
      const courseLesson = await firstValueFrom(
        this.courseClient.send('find_one_course_lesson_by_id', { id }),
      );
      return courseLesson;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch('patchLesson/:id')
  async updateCourseLesson(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    try {
      const courseLesson = await firstValueFrom(
        this.courseClient.send('update_course_lesson', {
          id,
          ...updateLessonDto,
        }),
      );
      return courseLesson;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('deleteLesson/:id')
  removeCourseLesson(@Param('id', ParseUUIDPipe) id: string) {
    if (!id) {
      throw new RpcException('id is required');
    }

    console.log('Deleting course lesson with ID:', id);

    return this.courseClient.send('delete_course_lesson', { id }).pipe(
      catchError((err) => {
        console.error('Error from microservice:', err);
        const errorMessage =
          typeof err === 'object' && err.message
            ? err.message
            : 'Unexpected error occurred';
        throw new RpcException({
          status: 400,
          message: errorMessage,
        });
      }),
    );
  }
  // Resource

  @Post('createResource')
  createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.courseClient.send(
      { cmd: 'create_resource' },
      createResourceDto,
    );
  }

  @Get('findAllResources')
  findAllResources(@Query() paginationDto: PaginationDto) {
    return this.courseClient.send('find_all_resources', paginationDto);
  }

  @Get('resource/:id')
  async findOneResource(@Param('id') id: string) {
    try {
      const resource = await firstValueFrom(
        this.courseClient.send('find_one_resource_by_id', { id }),
      );
      return resource;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch('patchResource/:id')
  async updateResource(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    try {
      const resource = await firstValueFrom(
        this.courseClient.send('update_resource', { id, ...updateResourceDto }),
      );
      return resource;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('deleteResource/:id')
  removeResource(@Param('id', ParseUUIDPipe) id: string) {
    if (!id) {
      throw new RpcException('id is required');
    }

    console.log('Deleting resource with ID:', id);

    return this.courseClient.send('delete_resource', { id }).pipe(
      catchError((err) => {
        console.error('Error from microservice:', err);
        const errorMessage =
          typeof err === 'object' && err.message
            ? err.message
            : 'Unexpected error occurred';
        throw new RpcException({
          status: 400,
          message: errorMessage,
        });
      }),
    );
  }

  //Module

  @Post('createModule')
  createModule(@Body() createModuleDto: ModuleDto) {
    return this.courseClient.send('create_module', createModuleDto);
  }

  @Get('findAllModules')
  findAllModules(@Query() paginationDto: PaginationDto) {
    return this.courseClient.send('find_all_modules', paginationDto);
  }

  @Get('findOneModule/:id')
  async findOneModule(@Param('id') id: string) {
    try {
      const module = await firstValueFrom(
        this.courseClient.send('find_one_module_by_id', { id }),
      );
      return module;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch('patchModule/:id')
  async updateModule(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ) {
    try {
      const module = await firstValueFrom(
        this.courseClient.send('update_module', { id, ...updateModuleDto }),
      );
      return module;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('deleteModule/:id')
  removeModule(@Param('id', ParseUUIDPipe) id: string) {
    if (!id) {
      throw new RpcException('id is required');
    }

    // console.log('Deleting resource with ID:', id);

    return this.courseClient.send('delete_module', { id }).pipe(
      catchError((err) => {
        console.error('Error from microservice:', err);
        const errorMessage =
          typeof err === 'object' && err.message
            ? err.message
            : 'Unexpected error occurred';
        throw new RpcException({
          status: 400,
          message: errorMessage,
        });
      }),
    );
  }

  @Post('validateProducts')
  async validateProducts(@Body('ids') ids: string[]) {
    try {
      return this.courseClient.send('validateProducts', ids);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
