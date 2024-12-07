import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Category } from '@prisma/client';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  public photo: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  public price: number;

  @IsNotEmpty()
  public sellerId: string;

  @IsNotEmpty()
  @IsEnum(Category)
  public category: Category;

  @IsNotEmpty()
  public technologies: string[];

  @IsNotEmpty()
  public approved: boolean;

  @IsNotEmpty()
  public language: string;

  @IsNotEmpty()
  public available: boolean;

  @IsNotEmpty()
  public productId: string;

  @IsNotEmpty()
  @IsString()
  public level: string;
  /*
  @IsNotEmpty()
  public sections: string;*/
}
