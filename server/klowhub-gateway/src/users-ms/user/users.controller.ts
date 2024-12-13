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
import { catchError, firstValueFrom } from 'rxjs';
import { UpdateUserDto, UserDto } from '../dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @Post('create')
  createUser(@Body() createUserDto: UserDto) {
    return this.userClient.send('create_user', createUserDto);
  }
  @Get('findAll')
  findAllUsers(@Query() paginationDto: PaginationDto) {
    return this.userClient.send('find_all_users', paginationDto);
  }

  @Get('user/:id')
  async findOneUser(@Param('id') id: string) {
    try {
      const user = await firstValueFrom(
        this.userClient.send('find_one_user', { id }),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch('patch/:id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await firstValueFrom(
        this.userClient.send('update_user', { id, ...updateUserDto }),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete('delete/:id')
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    if (!id) {
      throw new RpcException('id is required');
    }

    // console.log('Deleting user with ID:', id);

    return this.userClient.send('delete_user', { id }).pipe(
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
