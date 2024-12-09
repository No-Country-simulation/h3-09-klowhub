import { PartialType } from '@nestjs/mapped-types';
import { ModuleDto } from './create-module.dto';

export class UpdateModuleDto extends PartialType(ModuleDto) {
  id: string;
}
