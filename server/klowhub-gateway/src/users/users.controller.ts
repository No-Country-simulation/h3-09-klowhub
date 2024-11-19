import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { UserDto, UpdateUserDto } from './dto';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @Post('create')
  createUser(@Body() createUserDto: UserDto) {
    return this.userClient.send({ cmd: 'create_user' }, createUserDto);
  }
  @Get('findAll')
  findAllUsers(@Query() paginationDto: PaginationDto) {
    return this.userClient.send({ cmd: 'find_all_users' }, paginationDto);
  }

  @Get(':id')
  async findOneUser(@Param('id') id: number) {
    try {
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'find_one_user' }, { id }),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await firstValueFrom(
        this.userClient.send({ cmd: 'update_user' }, { id, ...updateUserDto }),
      );
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @Delete(':id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.userClient.send({ cmd: 'delete_user' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
