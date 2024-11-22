import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('User service');
  private readonly jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
  private readonly jwtExpiresIn = '1d'; // 24 horas

  async onModuleInit() {
    await this.$connect();
    this.logger.log('onModuleInit');
  }
  async validateToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { id: string };
      return this.findOneUser(decoded.id);
    } catch {
      return null;
    }
  }
  async login(
    email: string,
    password: string,
  ): Promise<{ token: string; user: Omit<User, 'password'> }> {
    const user = await this.findOneUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });
    const { password: _, ...userData } = user;

    return { token, user: userData };
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
