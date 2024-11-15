import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {  IsNumber, IsPositive } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

}
