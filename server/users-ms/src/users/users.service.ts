import {
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient, Roles, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('User service');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('onModuleInit');
  }

  async findOneUserByEmail(email: string) {
    this.logger.log('find_one_user_by_email');
    const user = await this.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findOneUser(id: string) {
    this.logger.log('find_one_user');
    const user = await this.user.findUnique({
      where: { id },
    });
    return user;
  }
  async getAllUsers() {
    this.logger.log('find_all_users');
    const users = await this.user.findMany();
    return users;
  }

  async createUser(userData: UserDto) {
    this.logger.log('create_user');
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const createUser = await this.user.create({ data: userData });
    return createUser;
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<User> {
    this.logger.log('update_user');
    const { id: _, ...Data } = updateData;
    const updateUser = await this.user.update({ where: { id }, data: Data });
    return updateUser;
  }

  async assignSellerRole(userId: string): Promise<string> {
    this.logger.log('Assigning SELLER role to user');

    const user = await this.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `User with ID ${userId} not found`,
      });
    }

    // Verificar si el usuario ya tiene el rol SELLER
    if (Array.isArray(user.role) && user.role.includes(Roles.SELLER)) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'User already has the SELLER role',
      });
    }
    const updatedRoles = [...user.role, Roles.SELLER];

    // Actualizar los roles del usuario
    await this.user.update({
      where: { id: userId },
      data: { role: updatedRoles },
    });

    return `SELLER role assigned to user with ID ${userId}`;
  }

  async deleteUser(userId: string): Promise<User> {
    this.logger.log('delete_user');

    const updateUser = await this.user.update({
      where: { id: userId },
      data: {
        available: false,
      },
    });
    return updateUser;
  }

  
}
