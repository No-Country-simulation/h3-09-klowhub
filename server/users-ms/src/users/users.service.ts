import { Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';


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

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    this.logger.log('delete_user');
    //agregar un patch y setear abailable a false
    if (!where.id) {
      throw new RpcException('id is required');
    }
    const deleteUser = await this.user.delete({
      where,
    });
    return deleteUser;
  }
}
