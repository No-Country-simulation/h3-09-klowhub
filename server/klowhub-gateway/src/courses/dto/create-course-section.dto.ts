import { Res } from '@nestjs/common';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateResourceDto } from './create-resource.dto';
import { Type } from 'class-transformer';

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  public titleSection: string;

  @IsString()
  @IsNotEmpty()
  public moduleId: string;

  @IsNumber()
  public order: number;
}
