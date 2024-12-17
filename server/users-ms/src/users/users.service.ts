import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('User service');

  constructor(
    @Inject('PAYMENT_SERVICE')
    private readonly paymentClient: ClientProxy
  ) {
    super()
  }
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

    const userFound = await this.findOneByEmail(userData.email)
      .catch()

    if (userFound) throw new RpcException(
      {
        status: 409,
        message: `User with email ${userData.email} already used`
      }
    )

    const customer = await firstValueFrom(
      this.paymentClient.send('stripe.create-customer', { email: userData.email, name: userData.name })
    )

    if (!customer) throw new RpcException({ status: 500, message: "ERROR: check logs" })

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const createUser = await this.user.create({
      data: {
        ...userData,
        stripeCustomerId: customer.id
      }
    });

    return createUser;
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<User> {
    this.logger.log('update_user');
    const { id: _, ...Data } = updateData;
    const updateUser = await this.user.update({ where: { id }, data: Data });
    return updateUser;
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

  private async findOneByEmail(email: string) {
    const user = await this.user.findUnique({ where: { email } })

    if (!user) throw new RpcException({ status: 404, message: `User with email ${email} not found` })

    return user
  }
}
