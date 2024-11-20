import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('User service');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('onModuleInit');
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

  async createUser(data: UserDto) {
    this.logger.log('create_user');
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const createUser = await this.user.create({ data: data });
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
    const deleteUser = await this.user.delete({
      where,
    });
    return deleteUser;
  }
}
