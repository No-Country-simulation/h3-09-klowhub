import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [PrismaModule], //import prisma module to use prisma service in your module
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
