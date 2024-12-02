import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { User as UserModel } from '@prisma/client';
import { UserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() { email, password }: LoginDto) {
    console.log('Microservicio: Procesando login para:', email);
    return this.userService.login(email, password);
  }
  @MessagePattern({ cmd: 'find_all_users' })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @MessagePattern({ cmd: 'find_one_user_by_email' })
  async getUserByEmail(@Payload('email') email: string) {
    return this.userService.findOneUserByEmail(email);
  }
  @MessagePattern({ cmd: 'find_one_user' })
  async getUserById(@Payload('id') id: string) {
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
  @MessagePattern({ cmd: 'delete_user' })
  async deleteUser(@Payload('id') id: string): Promise<UserModel> {
    if (!id) {
      throw new RpcException('id is required');
    }
    console.log(id);
    return this.userService.deleteUser(id);
  }
}
