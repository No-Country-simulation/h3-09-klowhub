import { Res } from '@nestjs/common';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateResourceDto } from './create-resource.dto';
import { Type } from 'class-transformer';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  public moduleId: string;

  @IsNumber()
  public order: number;

  @IsString()
  @IsNotEmpty()
  public contentLink: string;

  @IsString()
  public image: string;
}
