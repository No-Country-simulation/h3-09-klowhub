import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;


}
