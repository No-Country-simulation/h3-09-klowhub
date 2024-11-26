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
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject('COURSES_SERVICE') private readonly courseClient: ClientProxy,
  ) {}

  @Post('create')
  createCourse(@Body() createCourseDto: CreateCourseDto) {
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
        this.courseClient.send({ cmd: 'find_one_course' }, { id }),
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
}
