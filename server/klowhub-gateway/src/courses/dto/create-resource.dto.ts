import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateResourceDto {
  @IsNotEmpty()
  public sectionId: string;
  @IsNotEmpty()
  @IsString()
  public mediaId: string;
}
