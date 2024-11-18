import { PartialType } from '@nestjs/mapped-types';
import { CreateAppDto } from './create-app.dto';
import { IsUUID } from 'class-validator';

export class UpdateAppDto extends PartialType(CreateAppDto) {
  
}
