import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class CreateCourseSectionDto {
  @IsNotEmpty()
  @IsString()
  public titleSection: string;

  @IsNotEmpty()
  @IsNumber()
  public courseId: string; // Relationship whit Course

  @IsOptional()
  @IsNumber()
  public resourceId?: string; // Optional value

  @IsNotEmpty()
  @IsNumber()
  public order: number;
}
