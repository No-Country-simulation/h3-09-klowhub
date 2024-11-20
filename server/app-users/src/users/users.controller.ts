import { Controller, Param } from '@nestjs/common';
import { UserService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'find_all_users' })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @MessagePattern({ cmd: 'find_one_user' })
  async getUser(@Payload('id') id: string) {
    return this.userService.findOneUser(id);
  }
  @MessagePattern({ cmd: 'create_user' })
  async signupUser(@Payload() userData: UserDto) {
    return this.userService.createUser(userData);
  }
  @MessagePattern({ cmd: 'update_user' })
  async updateUser(@Payload() updateData: UpdateUserDto): Promise<UserModel> {
    return this.userService.updateUser(updateData.id, updateData);
  }
  @MessagePattern('delete_user')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: id });
  }
}
