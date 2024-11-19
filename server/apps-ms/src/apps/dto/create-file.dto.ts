import { IsUUID } from 'class-validator';

export class CreateFileDto {
  @IsUUID()
  public appId: string;
}
