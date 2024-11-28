import { PartialType } from '@nestjs/mapped-types';
import { CreateAppDto } from './create-app.dto';
import { IsUUID } from 'class-validator';

export class UpdateAppDto extends PartialType(CreateAppDto) {

  @IsUUID('4', { message: 'entro en micro debe ser un UUID válido de versión 4.' })
  public id: string;
}
