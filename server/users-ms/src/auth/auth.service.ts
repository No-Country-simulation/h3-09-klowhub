import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  constructor(private readonly userService: UserService) {
    super();
  }

  private logger = new Logger('Auth service');
  private readonly jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
  private readonly jwtExpiresIn = '1d'; // 24 horas

  async onModuleInit() {
    await this.$connect();
    this.logger.log('onModuleInit');
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as { id: string };
      return this.userService.findOneUser(decoded.id);
    } catch {
      return null;
    }
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userService.findOneUserByEmail(email);

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

    return { token };
  }

}
