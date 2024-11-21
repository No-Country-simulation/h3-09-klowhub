import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './create-user.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateUserDto extends PartialType(UserDto) {}
