import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
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

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('COURSES_SERVICE') private readonly courseClient: ClientProxy,
  ) {}
  // Courses

  @Get('findCoursesByUserId/:userId')
  findCoursesByUserId(@Param('userId') userId: string) {
    return this.courseClient.send({ cmd: 'find_courses_by_user_id' }, userId);
  }

  @Post('create')
  createCourse(@Body() createCourseDto: CourseDto) {
    return this.courseClient.send({ cmd: 'create_course' }, createCourseDto);
  }
  @Get('findAll')
  findAllCourses(@Query() paginationDto: PaginationDto) {
    return this.courseClient.send({ cmd: 'find_all_courses' }, paginationDto);
  }

  @Get('course/:id')
  async findOneCourse(@Param('id') id: string) {
    try {
      const course = await firstValueFrom(
        this.courseClient.send({ cmd: 'find_one_course_by_id' }, { id }),
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
        this.courseClient.send(
          { cmd: 'update_course' },
          { id, ...updateCourseDto },
        ),
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

    return this.courseClient.send({ cmd: 'delete_course' }, { id }).pipe(
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

  @Post('createLesson')
  createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.courseClient.send({ cmd: 'create_lesson' }, createLessonDto);
  }

  @Get('findAllLessons')
  findAllCourseLessons(@Query() paginationDto: PaginationDto) {
    return this.courseClient.send(
      { cmd: 'find_all_course_lessons' },
      paginationDto,
    );
  }

  @Get('courseLesson/:id')
  async findOneCourseLesson(@Param('id') id: string) {
    try {
      const courseLesson = await firstValueFrom(
        this.courseClient.send(
          {
            cmd: 'find_one_course_lesson_by_id',
          },
          { id },
        ),
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
        this.courseClient.send(
          { cmd: 'update_course_lesson' },
          { id, ...updateLessonDto },
        ),
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

    return this.courseClient.send({ cmd: 'delete_course_lesson' }, { id }).pipe(
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
    return this.courseClient.send({ cmd: 'find_all_resources' }, paginationDto);
  }

  @Get('resource/:id')
  async findOneResource(@Param('id') id: string) {
    try {
      const resource = await firstValueFrom(
        this.courseClient.send({ cmd: 'find_one_resource_by_id' }, { id }),
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
        this.courseClient.send(
          { cmd: 'update_resource' },
          { id, ...updateResourceDto },
        ),
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

    return this.courseClient.send({ cmd: 'delete_resource' }, { id }).pipe(
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
    return this.courseClient.send({ cmd: 'create_module' }, createModuleDto);
  }

  @Get('findAllModules')
  findAllModules(@Query() paginationDto: PaginationDto) {
    return this.courseClient.send({ cmd: 'find_all_modules' }, paginationDto);
  }

  @Get('findOneModule/:id')
  async findOneModule(@Param('id') id: string) {
    try {
      const module = await firstValueFrom(
        this.courseClient.send({ cmd: 'find_one_module_by_id' }, { id }),
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
        this.courseClient.send(
          { cmd: 'update_module' },
          { id, ...updateModuleDto },
        ),
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

    console.log('Deleting resource with ID:', id);

    return this.courseClient.send({ cmd: 'delete_module' }, { id }).pipe(
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
}
